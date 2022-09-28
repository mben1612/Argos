const { SlashCommandBuilder,ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const words = require("../wordsapi.js");
const translater = require("../translator.js");

module.exports ={
    data: new SlashCommandBuilder()
        .setName('text')
        .setDescription('Random Text or word')
        .addSubcommand(subCommand=> subCommand.setName("satz").setDescription("zufälliger Satz")
        .addIntegerOption(option => option.setName("length").setDescription("Wie viele Sätze").setRequired(false))
        .addStringOption(option3 => option3.setName("language").setDescription("Ergebnis übersetzen").setRequired(false)),)         
        .addSubcommand(subCommand=> subCommand.setName("wort").setDescription("zufälliges Wort")),


    async execute(interaction) {
        switch(interaction.options.getSubcommand()) {
            case "satz": {
                await interaction.deferReply();
                var count = 1;
                // console.log(interaction.options);
                if(interaction.options.getInteger("length") != undefined){
                    count = interaction.options.getInteger("length");
                }
                var sätze = "";
                for(let i = 0; i< count;i++){
                    var satz = createsatz();
                    sätze = sätze + " " + satz +getzeichen();
                    await interaction.editReply({content:sätze.replace(/(\r\n|\n|\r)/gm, "")}); 
                }
                if(interaction.options.getString("language") != undefined){
                    translater(interaction.options.getString("language"),sätze,0,async function(response){
                        await interaction.editReply({content: "En: "+ sätze.replace(/(\r\n|\n|\r)/gm, "")+ "\n"+ interaction.options.getString("language") +": " + response})
                    })
                }
                break;
            }
            case "wort": {
                const row = new ActionRowBuilder()
                    .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('text')
                        .setPlaceholder('Nothing selected')
                        .addOptions(
                            {
                                label: 'Wörter',
                                description: '-',
                                value: '1',
                            },
                            {
                                label: 'Namen',
                                description: '-',
                                value: '2',
                            },
                            {
                                label: 'Nomen',
                                description: '-',
                                value: '3',
                            },
                            {
                                label: 'Konjunktion',
                                description: '-',
                                value: '4',
                            },
                            {
                                label: 'Interjektionen',
                                description: '-',
                                value: '5',
                            },
                            {
                                label: 'pronomen',
                                description: '-',
                                value: '6',
                            },
                            {
                                label: 'Verben',
                                description: '-',
                                value: '7',
                            },
                            {
                                label: 'Adjektive',
                                description: '-',
                                value: '8',
                            },
                            {
                                label: 'Präpositionen',
                                description: '-',
                                value: '9',
                            },
                            {
                                label: 'Fragewörter',
                                description: '-',
                                value: '10',
                            },
                        ),
                );
                await interaction.reply({ content: 'Wörter!', components: [row] });
                break;
            }
            
        }
        
    },

    async chose(interaction){
        // console.log(interaction);
        await interaction.deferReply();
        var reply =words(interaction.values[0]);
        await interaction.editReply({content:"Dein Wort ist: " + reply});
        
    }
}

// var sätze = "";
function createsatz(){
    var satz = "";
    var satzstruktur= [
        ["nomen","verben"],
        ["nomen", "verben", "nomen"],
        ["nomen", "verben", "pronomen"],
        ["nomen", "verben", "pronomen", "adjectives"],
        ["nomen", "verben", "pronomen"],
        ["nomen","verben", "adjectives", "nomen"],
        ["nomen", "verben", "adjectives", "nomen"],
        ["adjectives", "nomen", "verben"],
        ["adjectives", "nomen", "verben", "adjectives"],
        ["adjectives", "nomen", "verben", "adjectives", "nomen"],
        ["adjectives", "pronomen", "verben"],
        ["adjectives", "pronomen", "verben", "nomen"],
        ["adjectives", "pronomen", "verben", "adjectives", "nomen"],
        ["adjectives", "pronomen", "verben", "adjectives", "pronomen"],
        ["adjectives", "pronomen", "verben", "pronomen"],
        ["pronomen", "verben"],
        ["pronomen", "verben", "pronomen"],
        ["name", "verben"],
        ["name", "verben", "adjectives"],
        ["name", "verben", "name"],
        ["name", "verben", "pronomen"],
        ["name", "verben", "nomen"],
        ["interjektionen"],
        ["nomen", "verben", "praepositionen", "nomen"],
        ["adjectives", "nomen", "verben", "praepositionen", "nomen"],
        ["adjectives", "name", "verben", "praepositionen", "nomen"],
        ["name", "verben", "praepositionen", "nomen"],
        ["adjectives", "name", "verben", "praepositionen", "name"],
        ["name", "verben", "praepositionen", "name"],
        ["name", "verben", "praepositionen", "nomen"],
        ["adjectives", "name", "verben", "praepositionen", "nomen"],
        ["interjektionen", "nomen", "verben", "nomen"],
        ["interjektionen", "nomen", "verben", "adjectives", "nomen"],
        ["name", "verben", "adjectives"],
        ["name", "konjunktionen", "nomen", "verben"],
        ["verben"],
        ["verben", "adjectives"],
        ["verben", "adjectives", "praepositionen", "pronomen"],
        ["verben", "adjectives", "verben"],
        ["verben", "adjectives", "nomen", "verben"],
        ["verben", "adjectives", "name", "verben"],
        ["konjunktionen", "nomen", "verben"],
        ["frage", "verben", "nomen"],
        ["frage", "verben", "nomen", "adjectives"],
        ["nomen", "praepositionen", "adjectives", "nomen", "nomen", "konjunktionen", "nomen", "verben", "nomen"],
        ["frage", "verben", "pronomen"],
        ["frage", "verben", "name"],
        ["frage", "adjectives"],
        ["frage", "adjectives", "verben", "name"],
        ["frage", "adjectives", "verben", "nomen"],
        ["frage", "adjectives", "verben", "pronomen"]
    ]
    Satzstr = satzstruktur[Math.floor(Math.random()*satzstruktur.length)];
    var l = 0;
    for(let i = 0; i < Satzstr.length;i++){
        var wo = Satzstr[i];
        var wort =getwort(wo);
        satz = satz + " " + wort;
        // console.log (result);       
    }
    return satz;
}

function getwort(worttype){
    var number = "1";
    switch(worttype){
        case "Wörter":{
            number = "1";
            break;
        }
        case "name":{
            number = "2";
            break;
        }
        case "nomen":{
            number = "3";
            break;
        }
        case "konjunktionen":{
            number = "4";
            break;
        }
        case "interjektionen":{
            number = "5";
            break;
        }
        case "pronomen":{
            number = "6";
            break;
        }
        case "verben":{
            number = "7";
            break;
        }
        case "adjectives":{
            number = "8";
            break;
        }
        case "praepositionen":{
            number = "9";
            break;
        }
        case "frage":{
            number = "10";
            break;
        }

    }
    return words(number);

}
function getzeichen(){
    var zeichen = '.';
    var iz = Math.floor(Math.random()*4)
		if(iz <= 2) {
			zeichen = '.';
		}
		else {
			iz = Math.floor(Math.random()*8);
			if(iz == 0) {
				zeichen = ',';
			}
			else if(iz == 1) {
				zeichen = ';';
			}
			else if(iz == 2) {
				zeichen = '!';
			}
			else if(iz == 3) {
				zeichen = '?';
			}
			else if(iz == 4) {
				zeichen = ':';
			}
			else if(iz == 5) {
				zeichen = '-';
			}
			else if(iz == 6) {
				zeichen = '/';
			}
			else if(iz == 7) {
				zeichen = "...";
			}
		}
        return zeichen;
}
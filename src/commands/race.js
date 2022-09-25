const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports ={
    data: new SlashCommandBuilder()
        .setName('race')
        .setDescription('Rennen')
        .addIntegerOption(option => option.setName("wette").setDescription("Auf eins oder zwei Wetten").setRequired(false)),


    async execute(interaction) {
        await interaction.reply({content: "Start Race"});
        startrace(interaction);
    }
}

const goal = 5;
async function startrace(interaction){
    var first = 0;
    var second = 0;
    var active = true;

    while(active){
        if(first == 5){
            active = false;
        }
        else if(second == 5){
            active = false;
        }
        else{
            var i = Math.random()*2;
            if( i< 1){
                first += 1;
            }
            else{
                second += 1;
            }
            show(first,second,interaction);
        }
    }
}

async function show(a,b,interaction){
    var text = "";
    for(let i = 0; i<= goal;i++){
        if(a==i && b== i) {
            text = text+"|#   #|\n";
        }
        else if(a==i && b!= i) {
            text = text+"|#      |\n";
        }
        else if(a!=i && b== i) {
            text = text+"|      #|\n";
        }
        else if(a!=i && b!= i) {
            text = text+"|         |\n";
        }
    }
    await   interaction.editReply({content:text});
}
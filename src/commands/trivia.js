const { SlashCommandBuilder } = require("@discordjs/builders");
const qua = require("../triviafragenapi.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Trivia')
        .addSubcommand(subCommand=> subCommand.setName("start").setDescription("Startet trivia"))
        .addSubcommand(subCommand=> subCommand.setName("end").setDescription("Beendet trivia"))
        .addSubcommand(subCommand=> subCommand.setName("score").setDescription("Zeigt den Score der aktuellen Runde")),


    async execute(interaction) {

        switch(interaction.options.getSubcommand()) {
            case "start":
                await interaction.reply({content: "Trivia"});
                startinteraction = interaction;
                newfrage(interaction);
                start();
                break;
            case "end":
                active = false;
                interaction.reply({content: "Trivia beendet" });
                clearInterval(interval); 
                break;
            case "score":
                // console.log(scorelist);
                if(scorelist.length >0){
                    var text ="";
                    for(let i = 0;i<scorelist.length;i++){
                        text = text + scorelist[i].id.toString() + ": " + scorelist[i].score +"\n";
                    }
                     
                    interaction.reply({content: text, ephemeral: true });
                }

                break;
        }
        // console.log(Date.now() +" "+ interaction.createdTimestamp)
        


    },
    async buttonclick(buttoniteraction){
        if(active){
            const args = buttoniteraction.customId.split(" ");
            // console.log(args[1] + " "+ right.toString());

            addanswer(buttoniteraction.user,args[1])
            // console.log(tempscore);
            // addscore(buttoniteraction.user);
        }
        
       
    }
}

var right ="";
var scorelist = [];
var tempscore = [];
var startinteraction;
var active = false;
var lastmsg;
var answers;
var typeofquestion;
function newfrage(interaction){
    qua(async function(body){
         console.log(body);
        const obj = JSON.parse(body);
        // console.log(obj);
        const frage = decodeURIComponent(obj.results[0].question);
        answers = obj.results[0].incorrect_answers;
        var correct_answer = decodeURIComponent(obj.results[0].correct_answer);
        typeofquestion = decodeURIComponent(obj.results[0].difficulty);
        answers.push(correct_answer);
        // console.log(answers);
        answers = shuffle(answers);
        for(let i = 0; i< answers.length;i++){
            answers[i] = decodeURIComponent(answers[i]);
            if(answers[i]== correct_answer){
                right = i +1;
            }
        }
        var row;
        row = new ActionRowBuilder();
        for(let i = 0; i< answers.length;i++){
            
            row.addComponents(
                new ButtonBuilder()
                .setCustomId('trivia '+(i+1))
                .setLabel(answers[i].toString())
                .setStyle(ButtonStyle.Primary),
            )
            }
        // var f = convert(frage.toString());
        const msg = await interaction.channel.send({embeds:         
            [
            new EmbedBuilder()
            .setTitle(frage)
            .addFields([
                {
                    name: "Kategorie:",
                    value: decodeURIComponent(obj.results[0].category),
                    inline: true
                },
                {
                    name: "Schwierigkeitsgrad:",
                    value: obj.results[0].difficulty,
                    inline: true
                }
                
            ])
        ],
             components: [row]})
        lastmsg = msg;
            
    })
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function addscore(user,typeofq){
    for(let i = 0; i< scorelist.length;i++){
        if(scorelist[i].id== user){
            // console.log(typeofq);
            switch(typeofq){
                case "easy":
                    scorelist[i].score += 1;
                    break;
                case "medium":
                    scorelist[i].score += 2;
                    break;
                case "hard":
                    scorelist[i].score += 3;
                    break;
            }
                
            
        
            return;
        }
    }
    switch(typeofq){
        case "easy":
            scorelist.push({id:user, score:1})
            break;
        case "medium":
            scorelist.push({id:user, score:2})
            break;
        case "hard":
            scorelist.push({id:user, score:3})
            break;
    }
}

var interval;
function start(){
    active = true;
    right = "";
    scorelist = [];
      interval = setInterval(function() {
        if(active){
            if(right != ""){
                editmsg(lastmsg);
                // console.log(lastmsg);
            }
            // console.log(tempscore);
            for(let i = 0; i< tempscore.length;i++){
                if(tempscore[i].a == right.toString()){
                    startinteraction.channel.send(tempscore[i].user.toString());
                    addscore(tempscore[i].user,typeofquestion);
                }
            }
            tempscore = [];
            newfrage(startinteraction);
        }
      }, 30000);
      
     

}
function addanswer(user,answer){
    for(let i = 0; i< tempscore.length;i++){
        if(tempscore[i].user == user){
            tempscore[i].a = answer;
            return;
        }
    }
    tempscore.push({user: user,a:answer});
}
function convert (string) {
    string = string.replace(/&quot;/g, '"');
    return string.replace(/&#(?:x([\da-f]+)|(\d+));/ig, function (_, hex, dec) {
      return String.fromCharCode(dec || +('0x' + hex))
    })
}


function editmsg(msg){
    var row;
    
        row = new ActionRowBuilder();
        for(let i = 0; i< answers.length;i++){
            if(i+1 == right){
                row.addComponents(
                    new ButtonBuilder()
                    .setCustomId('trivia '+(i+1))
                    .setLabel(answers[i].toString())
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
                )
            }
            else{
                row.addComponents(
                    new ButtonBuilder()
                    .setCustomId('trivia '+(i+1))
                    .setLabel(answers[i].toString())
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                )
            }

            }


                
        msg.edit({components: [row]});
    
}


require("dotenv").config()
const fs = require("fs")
const {Client, ActivityType, Collection, GatewayIntentBits} = require("discord.js");
const {Player} = require("discord-player");




const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildVoiceStates]});

client.commands = new Collection();


const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 
// module.exports = async function getUserbyId(user_id){
//     users = await client.get_all_members();
//     var user;
//     for(let i = 0; i< users.length;i++){
//         if(user_id == users[i].id){
//             user = users[i];
//         }
//     }
//     return user;
// }

commandFiles.forEach((commandFile) => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command);
})


client.once("ready",()=>{
    console.log(`Ready! Logged in as ${client.user.tag}! Im on ${client.guilds.cache.size} guilds`);
    var meinIntervall = setInterval(function() { 
        var status = ["Stadt land Fluss", "Schere Stein Papier", "Musik","nichts","mit Essen","Spiele", "Verstecken", "am Computer", "Fangen", "Sport", "im Regen", "mit einem Haustier", "mit einem Freund", "alleine" , "ein Musikinstrument"];
        var ones =status[Math.floor(Math.random()*status.length)];
        // var ones = "test";
        client.user.setActivity({name: ones, type: ActivityType.Playing});
        // alle 5 Sekunden ausführen 
    }, 5000);
})
client.on('message', async msg => {
    // console.log(msg);
});

client.on("interactionCreate", async (interaction) => {
    // console.log(interaction);
    if(interaction.isButton()){
        const args = interaction.customId.split(" ")
        const customid = args[0].trim();
        // const customid = "trivia";
        // console.log(interaction);
        var originalcommand;
        // console.log(customid);
        switch(customid){          
            case "trivia": 
                originalcommand = client.commands.get('trivia');
                interaction.reply({content:"you clicked " + args[1], ephemeral: true });
                break;
        }
        
        // console.log(originalcommand);
        originalcommand.buttonclick(interaction);
        return;
    }
    if (interaction.isStringSelectMenu()){
        var originalcommand;
        // console.log(interaction);
        // interaction.reply({content:"you chose " , ephemeral: true });
        originalcommand = client.commands.get(interaction.customId);
        // console.log(originalcommand);
         originalcommand.chose(interaction);
        return;
    } 
    if(!interaction.isCommand()) return;


    

    const command = client.commands.get(interaction.commandName)

    if(command) {
        try {
            await command.execute(interaction,client);
        }
        catch(error){
            console.error(error);
            if(interaction.deferred || interaction.replied) {
                interaction.editReply('There was an error while executing this command!')
            }else {
                interaction.reply('There was an error while executing this command!')
            }
        }
    }
})
const player =  new Player(client,{
    ytdlOptions:{
        quality:"highestaudio",
        highWaterMark: 1<<25
    }
})
player.extractors.loadDefault()
client.player = player;
client.player.on('connectionCreate', (queue) => {
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
      const oldNetworking = Reflect.get(oldState, 'networking');
      const newNetworking = Reflect.get(newState, 'networking');
      //console.log(newNetworking);

      const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
        const newUdp = Reflect.get(newNetworkState, 'udp');
        clearInterval(newUdp?.keepAliveInterval);
      }

      oldNetworking?.off('stateChange', networkStateChangeHandler);
      newNetworking?.on('stateChange', networkStateChangeHandler);
    });
});

client.login(process.env.DISCORD_BOT_TOKEN);


// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(express.static('public'));
// app.use(express.json());
// app.use(cors());

// app.use('/', require('./speechapi'));

// app.use(function(err,req,res,next){
//     res.status(422).send({error: err.message});
// });

// app.listen(process.env.PORT || 4000, function(){
//     console.log('Ready to Go!');
// });
require("dotenv").config()
const fs = require("fs")
const {Client, ActivityType, Collection, GatewayIntentBits} = require("discord.js");

const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages]});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 


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

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if(command) {
        try {
            await command.execute(interaction);
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

client.login(process.env.DISCORD_BOT_TOKEN);
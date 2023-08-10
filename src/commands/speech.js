const { SlashCommandBuilder } = require("@discordjs/builders");
const {EndBehaviorType } = require("@discordjs/voice");
const fs = require('fs');
const transcribe = require("../speechapi");
const { exec } = require('child_process');
const { createWriteStream } = require("node:fs")




module.exports ={
    data: new SlashCommandBuilder()
        .setName('speechcommands')
        .setDescription('activate deactivate speech commanfs')
        .addBooleanOption(option => option.setName("bool").setDescription("true false")),


    async execute(interaction,client) {

       var b = interaction.options.getBoolean("bool") || true;
       if(b){
        await interaction.reply("Listening");
        connect(interaction,client)
       }
       else{
        await interaction.reply("not Listening");
       }
    }


}






async function connect(interaction, client) {
  const queue = client.player.queue || await client.player.nodes.create(interaction.guildId);
  if(client.player.queue != null){
    console.log("already connected to queue");
  }
  else{
    client.player.queue = queue;
    try {
      await queue.connect(interaction.member.voice.channelId, { deaf: false });
   } catch {
      return interaction.followUp('Failed to connect to your channel');
  }
  }

  const voiceConnection = client.player.queue.dispatcher.voiceConnection
  //console.log(voiceConnection)
  voiceConnection.receiver.speaking.on('start', async (user_id) => {

    const guild = interaction.guild

    const user = guild.members.cache.get(user_id).user;
    
    //voiceConnection.receiver.emitter.setMaxListeners(100);
    record(interaction,user,queue,voiceConnection );
  });

}
 
var listening = []


async function record(interaction,member, queue,voiceConnection ){
  // initialize receiver stream
  const date = new Date().getTime();
  var dataFile = `./recording-${member.id}-${date}`;
  if(listening.includes(member.id)){
    console.log("Still working");
    return;
  }
  console.log(`I'm listening to ${member.username}`)
  listening.push(member.id);


  const stream = queue.voiceReceiver.recordUser(interaction.member.id, {
    mode: 'pcm', // record in pcm format
    end: EndBehaviorType.AfterSilence // stop recording once user stops talking
  });
   
  const writer = stream.pipe(createWriteStream(dataFile +".pcm")); // write the stream to a file

  writer.once('finish', () => {
    console.log("finished");
    for (let i = 0; i < listening.length; i++) 
    {
      console.log(member.id+ " " + listening[i]);
      if (listening[i] == member.id) {
        listening = listening.slice(i+1)
        console.log(listening);
      }
  }

    
    console.log(dataFile);
    
    convertToMP3(dataFile+".pcm",dataFile+".mp3",()=>{
      transcribetext(dataFile);   
    });


});

}
function transcribetext(dataFile){
  const response = transcribe(dataFile +".mp3");
  response.then((data) => {
    console.log(data);
    fs.unlinkSync(dataFile+".pcm");
    
  }).catch((err) => {
     console.log(err);
  });
}


function convertToMP3(pcmFilePath,mp3FilePath,myfunction) {
  const command = `ffmpeg -ac 48000 -ac 1 -f s16le -i ${pcmFilePath} ${mp3FilePath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Fehler beim Konvertieren der Audiodatei: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`ffmpeg-Fehler: ${stderr}`);
      myfunction();
      return;
    }
    console.log(`Die Audiodatei wurde erfolgreich in ${mp3FilePath} konvertiert.`);
    myfunction();
   
  });
}

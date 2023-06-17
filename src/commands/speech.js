const { SlashCommandBuilder } = require("@discordjs/builders");
const {EndBehaviorType } = require("@discordjs/voice");
const { createWriteStream } = require("node:fs")
const fs = require('fs');
const lamejs = require("lamejs")

module.exports ={
    data: new SlashCommandBuilder()
        .setName('speechcommands')
        .setDescription('activate deactivate speech commanfs')
        .addBooleanOption(option => option.setName("bool").setDescription("true false")),


    async execute(interaction,client) {
        await interaction.deferReply();
       var b = interaction.options.getBoolean("bool") || true;
       if(b){
        connect(interaction,client)
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
    record(interaction,user,queue);
  });

}
 
const listening = []


async function record(interaction,member, queue){
    // initialize receiver stream

  if(listening.includes(member.id)){
    return;
  }
  console.log(`I'm listening to ${member.username}`)
  listening.push(member.id);
  const stream = queue.voiceReceiver.recordUser(member.id, {
    mode: 'pcm', // record in pcm format
    end: EndBehaviorType.AfterSilence = 2 // stop recording once user stops talking
  });
  const date  = new Date().getSeconds();

  const writer = stream.pipe(createWriteStream(`./recording-${member.id}-${date}.pcm`)); // write the stream to a file

  writer.once('finish', () => {
    for (let i = 0; i < listening.length; i++) {
      if (listening[i] == member.id) {
        listening.concat(i);
      }
  }
    var dataFile = `./recording-${member.id}-${date}.pcm`;
    console.log(dataFile);
    fs.readFile(dataFile, function(err, data) {
      //console.log(data);
      var mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128);
      var mp3 = mp3encoder.encodeBuffer(data);
      //console.log(mp3); //encode mp3
      fs.unlinkSync(dataFile);
    });

});

}


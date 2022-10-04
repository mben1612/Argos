const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');
const {QueryType} = require("discord-player");




module.exports ={
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Spiel Musik')
        .addSubcommand(subCommand=> subCommand.setName("song").setDescription("Lädt ein einzelnes Lied mit der Url").addStringOption(option => option.setName("songname").setDescription("Url oder Name").setRequired(true)))
        .addSubcommand(subCommand=> subCommand.setName("playlist").setDescription("Lädt eine Playlist mit der Url").addStringOption(option => option.setName("url").setDescription("DIE URL").setRequired(true))),
        //.addSubcommand(subCommand=> subCommand.setName("search").setDescription("Sucht Lied").addStringOption(option => option.setName("suche").setDescription("Suche").setRequired(true))),



    async execute(interaction,client) {
        await interaction.deferReply();
        if(!interaction.member.voice.channel){
            await interaction.editReply("Komm sofort in den Sprachkanal")
            return;
        }
        const queue = await client.player.createQueue(interaction.guild);
        if(!queue.connection) await queue.connect(interaction.member.voice.channel)
        
        let embed = new EmbedBuilder()

        switch(interaction.options.getSubcommand()) {
            case "song": {
                let url = interaction.options.getString("songname");
                // console.log(url);
                if(!url.startsWith("http")){
                    //let url = interaction.options.getString("suche");
                    const result = await client.player.search(url,{
                        requestedBy: interaction.user,
                        searchEngine: QueryType.AUTO
                    })
                    if(result.tracks.length ===0){
                        await interaction.editReply("Kein Ergebnis");
                        return;
                    }
    
                    const song = result.tracks[0];
                    await queue.addTrack(song);
                    embed
                        .setDescription(`**[${song.title}]** wurde zur Queue hinzugefügt`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({text: "Duration " + song.duration})
                }
                else{
                    const result = await client.player.search(url,{
                        requestedBy: interaction.user,
                        searchEngine: QueryType.YOUTUBE_VIDEO
                    })
                    if(result.tracks.length ===0){
                        await interaction.editReply("Kein Ergebnis");
                        return;
                    }
    
                    const song = result.tracks[0];
                    await queue.addTrack(song);
                    embed
                        .setDescription(`**[${song.title}]** wurde zur Queue hinzugefügt`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({text: "Duration " + song.duration})
                    
                }
                

                break;
            }
            case "playlist": {
                let url = interaction.options.getString("url");
                const result = await client.player.search(url,{
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })
                if(result.tracks.length ===0){
                    interaction.editReply("Kein Ergebnis");
                    return;
                }

                const playlist = result.playlist;
                await queue.addTracks(playlist.tracks);
                embed
                    .setDescription(`${result.tracks.length} Lieder wurden zur Queue hinzugefügt`)
                    //.setThumbnail(playlist.thumbnail)
                break;
            }

        }

        if(!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        });

    }



}

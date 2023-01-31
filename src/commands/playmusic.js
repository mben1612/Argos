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
                
                

                break;
            }
            case "playlist": {
                let url = interaction.options.getString("url");
                var amount = 0;
                if(url == "KFB"){
                    const ar = ["https://open.spotify.com/playlist/7b0YmUSxfRxyR0DXbGhQxA?si=18b6245446cd4240","https://open.spotify.com/playlist/2BUAvkiuM4DixkDhu7pNwi?si=4fede221f99f4132","https://open.spotify.com/playlist/3OQlyZPJnFBplWsE8yK9pk?si=8cb0091b22ca4da0","https://open.spotify.com/playlist/7aa0QlMYSryhEOJsORWRe8?si=9cb72948542e48ba"];
                    for(let i = 0; i<ar.length;i++ ){
                        console.log(ar[i]);
                        let url = ar[i];
                        const result = await client.player.search(url,{
                            requestedBy: interaction.user,
                            searchEngine: QueryType.AUTO
        
                        })
                        if(result.tracks.length ===0){
                            interaction.editReply("Kein Ergebnis");
                            return;
                        }
        
                        const playlist = result.playlist;
                        amount += result.tracks.length;
                        await queue.addTracks(playlist.tracks);
                       
                        
                    }
                    embed
                    .setDescription(`${amount} Lieder wurden zur Queue hinzugefügt`)
                    //.setThumbnail(playlist.thumbnail)
                    break;
                }
                else{
                    
                    const result = await client.player.search(url,{
                        requestedBy: interaction.user,
                        searchEngine: QueryType.AUTO
    
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

        }

        //console.log(queue.play());
        if(!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        });

    }



}

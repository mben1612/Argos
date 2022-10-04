const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('queue')
        .addNumberOption((option)=> option.setName("page").setDescription("die Seite").setMinValue(1)),


    async execute(interaction,client) {
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guildId);
        // console.log(queue);
        if(!queue || !queue.playing){
            await interaction.editReply("Akttuellefswefsefs");
            return ;
        }

        const totalPages = Math.ceil(queue.tracks.length /10) || 1
        const page = (interaction.options.getNumber("page") || 1) -1

        if(page > totalPages){
            await interaction.editReply("Invalid Page");
            return ;
        }


        const queueString = queue.tracks.slice(page*10,page *10 +10).map((song,i)=>{
            return`${page * 10 + i + 1}. \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}> `;
            
        }).join("\n");

        const currentSong = queue.current
        console.log(queueString.toString());
        await interaction.editReply({
            embeds:[
                new EmbedBuilder()
                    .setDescription(`**Currently Playing**\n` +
                    currentSong ? `\`[${currentSong.duration}]\`${currentSong.title} -- <@${currentSong.requestedBy.id}>`+`\n\n**Queue**\n${queueString}\n` : "None"
                    
                    )
                    .setFooter({
                        text: `Seite ${page +1 } of ${totalPages}`
                    })
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })
    }
}
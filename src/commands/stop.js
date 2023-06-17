const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop den Bot'),


    async execute(interaction,client) {
        await interaction.deferReply();
        const queue = client.player.nodes.get(interaction.guildId);

        if(!queue ){
            await interaction.editReply("Akttuellefswefsefs");
            return ;
        }

        queue.tracks.clear();
        queue.node.pause();
        await interaction.editReply("Bye");
    }
}
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports ={
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumed den Bot'),


    async execute(interaction,client) {
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue ){
            await interaction.editReply("Akttuellefswefsefs");
            return ;
        }

        queue.setPaused(false);
        await interaction.editReply("resumed");
    }
}
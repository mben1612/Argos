const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports ={
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pausiert den Bot'),


    async execute(interaction,client) {
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue ){
            await interaction.editReply("Akttuellefswefsefs");
            return ;
        }

        queue.setPaused(true);
        await interaction.editReply("Paused");
    }
}
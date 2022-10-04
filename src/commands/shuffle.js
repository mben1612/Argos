const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports ={
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle'),


    async execute(interaction,client) {
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue ){
            await interaction.editReply("Akttuellefswefsefs");
            return ;
        }

        queue.shuffle();
        await interaction.editReply("Shuffled");
    }
}
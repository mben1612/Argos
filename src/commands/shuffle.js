const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports ={
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle'),


    async execute(interaction,client) {
        await interaction.deferReply();
        const queue = client.player.nodes.get(interaction.guildId);

        if(!queue ){
            await interaction.editReply("Akttuellefswefsefs");
            return ;
        }

        queue.tracks.shuffle();
        await interaction.editReply("Shuffled");
    }
}
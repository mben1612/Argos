const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports ={
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skipt den Bot'),


    async execute(interaction,client) {
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue ){
            await interaction.editReply("Akttuellefswefsefs");
            return ;
        }

        queue.skip();
        await interaction.editReply("skipped");
    }
}
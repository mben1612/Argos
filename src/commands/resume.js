const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports ={
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumed den Bot'),


    async execute(interaction,client) {
        await interaction.deferReply();
        const queue = client.nodes.get(interaction.guildId);

        if(!queue ){
            await interaction.editReply("Akttuellefswefsefs");
            return ;
        }

        queue.node.resume(false);
        await interaction.editReply("resumed");
    }
}
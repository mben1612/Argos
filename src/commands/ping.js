const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports ={
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),


    async execute(interaction) {
        // console.log(Date.now() +" "+ interaction.createdTimestamp)
        const msg = await interaction.reply({content: "Pong! " , ephemeral: true ,fetchReply: true});
        await interaction.editReply({content: "Pong! " +( msg.createdTimestamp -interaction.createdTimestamp) + "ms", ephemeral: true });
    }
}
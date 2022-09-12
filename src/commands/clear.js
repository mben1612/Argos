const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports ={
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(0)
        .setName('clear')
        .setDescription('clear!')
        .addIntegerOption(option => option.setName("amount").setDescription("Die Anzahl").setRequired(true)),


    async execute(interaction) {
        // console.log(Date.now() +" "+ interaction.createdTimestamp)
        const amount = interaction.options._hoistedOptions[0].value;
        // console.log(interaction);
        const channel = interaction.channel;
        // console.log(channel);
        const {size} = await channel.bulkDelete(amount ,true);
        await interaction.reply({content: size + " Nachrichten gelöscht", ephemeral: true });
    }
}
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Zeige informationen über diesen Server oder einen User an')
        .addSubcommand(subCommand=> subCommand.setName("server").setDescription("Informationen über diesen Server ausgeben"))
        .addSubcommand(
            subCommand => subCommand.setName("user").setDescription("Informationen über einen Member ausgeben")
            .addUserOption(option => option.setName("member").setDescription("Der Member").setRequired(true))),

 async execute(interaction) {
        // console.log(interaction.guild);
        switch(interaction.options.getSubcommand()) {
            case "server": {
                interaction.reply({embeds: [
                    new EmbedBuilder()
                    .setTitle(`Informationen für den Server ${interaction.guild.name}`)
                    .addFields([
                        {
                            name: "Channels",
                            value: `${interaction.guild.channels.cache.size} Channels`,
                            inline: true
                        },

                        {
                            name: "Erstellt",
                            value: `<t:${Math.round(interaction.guild.createdTimestamp/1000)}>`,
                            inline: true
                        }
                    ])

                ]})
                break
            }
            case "user": {
                const member = interaction.options.getMember("member")
                interaction.reply({embeds: [
                    new EmbedBuilder()
                    .setTitle(`Informationen für ${member.user.tag}`)
                    .setThumbnail(member.user.avatarURL({dynamic: true}))
                    .addFields([
                        {
                            name: "Account erstellt ",
                            value: `<t:${Math.round(member.user.createdTimestamp/1000)}>`,
                            inline: true
                        },

                        {
                            name: "Guild beigetreten",
                            value: `<t:${Math.round(member.joinedTimestamp/1000)}>`,
                            inline: true
                        }
                    ])

                ]})
                break
            }
        }
    }
}
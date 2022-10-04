const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports ={
    data: new SlashCommandBuilder()
        .setName('antwort')
        .setDescription('Antwortet')
        .addStringOption(option => option.setName("frage").setDescription("Frage").setRequired(true)),


    async execute(interaction) {
        const array = ["Ja", "Nein", "Vielleicht", "Ich glaub eher nicht", "Frag doch einfach noch mal!", "Eines Tages vielleicht", "Niemals!", "Auf keinen Fall!", "Auf jeden Fall", "Ich glaub schon", "Das ist doch offensichtlich.", "Ja...", "Ich finde schon", "Ich finde nicht", "Sicher", "Nicht soweit ich weiß", "Ich bin mir unsicher", "Ich habe da so eine vermutung", "Das ist Vollkommen unmöglich", "Eher nicht", "Nirgends bin ich mir sicherer!"]
        await interaction.reply({content:array[Math.floor(Math.random()*array.length)] ,fetchReply: true});
        
    }
}
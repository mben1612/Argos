const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require('request');
const translater = require("../translator.js");
const aiapi = require("../aiapi.js");



module.exports ={
    data: new SlashCommandBuilder()
        .setName('dialog')
        .setDescription('You can talk')
        .addSubcommand(subCommand=> subCommand.setName("start").setDescription("Startet"))
        .addSubcommand(subCommand=> subCommand.setName("end").setDescription("Beendet")),


    async execute(interaction) {
        
        
        

    }



}

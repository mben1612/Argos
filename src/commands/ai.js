const { SlashCommandBuilder } = require("@discordjs/builders");
const request = require('request');
const translater = require("../translator.js");
const aiapi = require("../aiapi.js");



module.exports ={
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('Generates a text(WIP)')
        .addStringOption(option1 => option1.setName("text").setDescription("Der Text").setRequired(true))
        .addIntegerOption(option2 => option2.setName("length").setDescription("Die Textlänge").setRequired(false))
        .addStringOption(option3 => option3.setName("language").setDescription("Ergebnis übersetzen").setRequired(false)),


    async execute(interaction) {
        const msg = interaction.deferReply();
        translater("en",interaction.options.getString("text"),0,function(response){
            var leng = 100;
            if(interaction.options.getInteger("length") != undefined){
                leng = interaction.options.getInteger("length");
            }
            
            aiapi(response,leng, async function(result){
                // console.log(result);
                if(interaction.options.getString("language") != undefined){
                    translater(interaction.options.getString("language"),result.toString(),0,async function(response){
                        await interaction.editReply({content: response})
                    })
                }
                else{
                    await interaction.editReply({content: result.toString()})
                }

            })
        })
        
        

    }



}



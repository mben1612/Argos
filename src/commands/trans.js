const { SlashCommandBuilder } = require("@discordjs/builders");
const translater = require("../translator.js");


module.exports ={
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translates a text')
        .addStringOption(option1 => option1.setName("text").setDescription("Der Text").setRequired(true))
        .addStringOption(option3 => option3.setName("language").setDescription("Ergebnis übersetzen").setRequired(true))
        .addIntegerOption(option2 => option2.setName("lenght").setDescription("Die Übersetzungshäufigkeit").setRequired(false)),
        


    async execute(interaction) {
        const msg = interaction.deferReply();
        if(interaction.options._hoistedOptions[2] != undefined){
            // translate(interaction.options._hoistedOptions[1].value,interaction.options._hoistedOptions[0].value,interaction.options._hoistedOptions[2].value,interaction);
            translater(interaction.options._hoistedOptions[1].value,interaction.options._hoistedOptions[0].value,interaction.options._hoistedOptions[2].value, async function(body){
                await interaction.editReply({content: body})
            })
        }
        else{
            translater(interaction.options._hoistedOptions[1].value,interaction.options._hoistedOptions[0].value,0, async function(body){
                await interaction.editReply({content: body})
            })
        }
 
        // console.log(text);

    }
}



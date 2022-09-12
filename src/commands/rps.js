const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Schere Stein Papier')
        .addStringOption(option => option.setName("scheresteinpapier").setDescription("SchereSteinPapier").setRequired(true)),


    async execute(interaction) {
        // console.log(Date.now() +" "+ interaction.createdTimestamp)
        var value = interaction.options._hoistedOptions[0].value;
        console.log(value);
        value = value.toLowerCase();
        const arry = ["schere","stein","papier"];
        const chose = arry[Math.floor(Math.random()*arry.length)];
        if(value == chose){
            await interaction.reply("Unentschieden");
        }
        else if(value == "stein"){
            if(chose == "papier"){
                result(true,interaction,chose,value);
            }
            else{
                result(false,interaction,chose,value);
            }
        }
        else if(value == "schere"){
            if(chose == "stein"){
                result(true,interaction,chose,value);
            }
            else{
                result(false,interaction,chose,value);
            }
        }
        else if(value == "papier"){
            if(chose == "schere"){
                result(true,interaction,chose,value);
            }
            else{
                result(false,interaction,chose,value);
            }
        }
        else{
            await interaction.reply({content: "Wähle Schere, Stein oder Papier", ephemeral: true});
        }
    }
}
async function result(argoswin,interaction,chose,_value){
    if(argoswin){
        await interaction.reply({embeds: [
            new EmbedBuilder()
            .setTitle("Ergebnis: Argos gewinnt gegen " + interaction.member.user.tag)
            .addFields([
                {
                    name: "Argos",
                    value: chose,
                    inline: true
                },
    
                {
                    name: interaction.member.user.tag,
                    value: _value,
                    inline: true
                }
            ])
    
        ]});
    }
    else{
        await interaction.reply({embeds: [
            new EmbedBuilder()
            .setTitle("Ergebnis: " + interaction.member.user.tag + " gewinnt gegen Argos")
            .addFields([
                {
                    name: "Argos",
                    value: chose,
                    inline: true
                },
    
                {
                    name: interaction.member.user.tag,
                    value: _value,
                    inline: true
                }
            ])
    
        ]});
    }

}
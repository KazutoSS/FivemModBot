const { ApplicationCommandType,ApplicationCommandOptionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField, ButtonBuilder,ButtonStyle } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "destek",
    type: ApplicationCommandType.ChatInput,
    description: "Destek yetkilsine ulaşın",
    run: async (client, interaction) => {

        // Connect to database and check user has yetkilirol
        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if(interaction.channel.id === data.destekodasi){
            interaction.reply({ content: "Bir yetkili çağırdın", ephemeral: true });
            interaction.channel.send({ content: `<@${interaction.member.id}> yeni bir destek talebinde bulundu. Kayıt odasına bekleniyorsunuz <@&${data.destekyetklirol}>` })
        } else{
            interaction.reply({ content: "Destek odası dışında bu komutu kullanamazsın", ephemeral: true });
        } 


}}
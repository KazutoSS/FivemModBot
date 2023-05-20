const { ApplicationCommandType,ApplicationCommandOptionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField, ButtonBuilder,ButtonStyle } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "kayit",
    type: ApplicationCommandType.ChatInput,
    description: "Kayıt yetkilsine ulaşın",
    run: async (client, interaction) => {

        // Connect to database and check user has yetkilirol
        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if(interaction.channel.id === data.kayitodasi){
            interaction.reply({ content: "Bir kayıt yetkilisi çağırdın", ephemeral: true });
            interaction.channel.send({ content: `<@${interaction.member.id}> yeni bir kayıt talebinde bulundu. Kayıt odasına bekleniyorsunuz <@&${data.kayityetkilirol}>` })
        } else{
            interaction.reply({ content: "Kayıt odası dışında bu komutu kullanamazsın", ephemeral: true });
        } 

}}
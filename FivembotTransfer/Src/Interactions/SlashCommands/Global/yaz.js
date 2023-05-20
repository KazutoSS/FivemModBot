const { ApplicationCommandType,ApplicationCommandOptionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField, ButtonBuilder,ButtonStyle } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "yaz",
    options: [{
        name: "text",
        type: ApplicationCommandOptionType.String,
        description: "Yazılacak yazıyı girin.",
        required: true
    }],
    type: ApplicationCommandType.ChatInput,
    description: "Botun yazı yazmasını sağlar",
    run: async (client, interaction) => {

        // Connect to database and check user has yetkilirol
        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if (!interaction.member.roles.cache.has(data.yetkilirol) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });

        // Create embed that includes aktifresmi
try{


    const string = interaction.options.getString("text");
        const embed = new EmbedBuilder()
            .setTitle(string)
            .setColor(0x00ff00);
        interaction.channel.send({ embeds: [embed] });
        interaction.reply({ content: "Sunucu aktif edildi!", ephemeral: true });
}catch(err){



}

}}
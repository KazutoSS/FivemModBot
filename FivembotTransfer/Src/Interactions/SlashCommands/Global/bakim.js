const { ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "bakim",
    type: ApplicationCommandType.ChatInput,
    description: "Sunucu bakimda",
    run: async (client, interaction) => {

        // Connect to database and check user has yetkilirol
        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if (!interaction.member.roles.cache.has(data.yetkilirol) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });

        // Create embed that includes bakimresmi
try{
        const embed = new EmbedBuilder()
            .setTitle("Sunucu bakımda")
            .setDescription("Sunucu bakımda!")
            .setImage(data.bakimresim)
            .setColor(0x00ff00)
            .setTimestamp();
        interaction.channel.send({ content: "@everyone",embeds: [embed] });
        interaction.reply({ content: "Sunucu bakımda!", ephemeral: true });
}catch(err){

    interaction.channel.send({ content: "Sunucu bakımda!" });
    interaction.reply({ content: "Sunucu bakımda!", ephemeral: true });

}

}}
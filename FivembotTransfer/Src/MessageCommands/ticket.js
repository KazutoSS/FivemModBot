const { ApplicationCommandType,ApplicationCommandOptionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField, ButtonBuilder,ButtonStyle } = require("discord.js");
const serverdb = require("../Structures/Schema/servers");

module.exports = {
    name: "ticketpanel",
    allowInDms: false,
    run: async(client, message, args) => {
        const data = await serverdb.findOne({ serverID: message.guild.id });
        if (!data) return message.reply({ content: "Sunucu veritabanında bulunamadı!"});
        if (!message.member.roles.cache.has(data.yetkilirol) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply({ content: "Bu komutu kullanmak için yetkin yok."});

        const embed = new EmbedBuilder()
            .setTitle("Ticket Panel")
            .setDescription("Ticket paneli açmak için aşağıdaki butonlardan doğru kategoriye tıklayın.")
            .setColor(0x00ff00)
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('icticket')
                .setLabel('Oyun içi destek')
                .setStyle('Primary')
                .setEmoji('🎮'),
            );
        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('odisi')
                .setLabel('Oyunu dışı destek')
                .setStyle('Primary')
                .setEmoji('💬'),
            );
        const row3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('hatareport')
                .setLabel("Hata bildir")
                .setStyle('Primary')
                .setEmoji('🐛'),
            );
        const row4 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('olusum')
                .setLabel("Oluşum Başvuru")
                .setStyle('Primary')
                .setEmoji('📝'),
            );

        message.channel.send({ embeds: [embed], components: [row, row2, row3, row4] });


        
    }
};
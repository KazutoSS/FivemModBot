const { ApplicationCommandOptionType ,ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField,ChannelType } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "kategoriayarla",
    options: [{
        name: "channel",
        type: ApplicationCommandOptionType.Channel,
        description: "Kanal seç.",
        channel_types: [ChannelType.GuildCategory],
        required: true
    },
    {
        name: "type",
        type: ApplicationCommandOptionType.String,
        description: "Category tipi seç.",
        required: true,
        choices: [
            {
                name: "Ticket",
                value: "ticket"
            }
        ]
    }
],
    type: ApplicationCommandType.ChatInput,
    description: "Sunucuyu databaseye ekler",
    run: async (client, interaction) => {

        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if (!interaction.member.roles.cache.has(data.yetkilirol) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });
        const channel = interaction.options.getChannel("channel");
        const type = interaction.options.getString("type");
            if (type === "ticket") {
                data.ticketkategori = channel.id;
                await data.save();
            }
            interaction.reply({ content: "Kanal ayarlandı!", ephemeral: true });


}}
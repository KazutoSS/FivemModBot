const { ApplicationCommandType,ApplicationCommandOptionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField, ButtonBuilder,ButtonStyle } = require("discord.js");
const serverdb = require("../Structures/Schema/servers");

module.exports = {
    name: "dbsil",
    allowInDms: false,
    ownerOnly: true,
    run: async(client, message, args) => {

        const data = await serverdb.findOne({ serverID: message.guild.id });
        if (!data) return message.reply({ content: "Sunucu veritabanında bulunamadı!"});
        await data.deleteOne();
        message.reply({ content: "Sunucu veritabanı silindi."});

    }
};
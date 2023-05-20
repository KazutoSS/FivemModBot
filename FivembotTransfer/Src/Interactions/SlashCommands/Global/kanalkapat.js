const { ApplicationCommandOptionType ,ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "logkapat",
    options: [
    {
        name: "type",
        type: ApplicationCommandOptionType.String,
        description: "Kapatılacak logu seç.",
        required: true,
        choices: [
            {
                name: "Gelen Giden",
                value: "gelen-giden"
            },
            {
                name: "Otorol",
                value: "otorol"
            },
            {
                name: "Güvenlik",
                value: "guvenlik"
            },
            {
                name: "Mod-Log",
                value: "mod"
            },
            {
                name: "Ses-Log",
                value: "ses"
            },
            {
                name: "Küfür-Log",
                value: "kufur"
            },
            {
                name: "Reklam-Log",
                value: "reklam"
            },
            {
                name: "ticket",
                value: "ticket"
            },
            {
                name: "davetlog",
                value: "davetlog"
            }
        ]
    }
],
    type: ApplicationCommandType.ChatInput,
    description: "Sunucuyu databaseye ekler",
    run: async (client, interaction) => {

        /* Channel Types
            gelengidenkanal: String,
    otorolkanal: String,
    guvenliklog: String,
    modlog: String,
    seslog: String,
    kufurlog: String,
    reklamlog: String,
    ticketlog: String,
    davetlog: String,
    */

        // Update channel info in database
        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if (!interaction.member.roles.cache.has(data.yetkilirol) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });
        const type = interaction.options.getString("type");
        if (type === "gelen-giden") {
            data.gelengidenkanal = "notset";
            await data.save();
        }
        if (type === "otorol") {
            data.otorolkanal = "notset";
            await data.save();
        }
        if (type === "guvenlik") {
                data.guvenliklog = "notset";
                await data.save();    
            }
            if (type === "mod") {
                data.modlog = "notset";
                await data.save();
            }
            if (type === "ses") {
                data.seslog = "notset";
                await data.save();
            }
            if (type === "kufur") {
                data.kufurlog = "notset";
                await data.save();
            }
            if (type === "reklam") {
                data.reklamlog = "notset";
                await data.save();
            }
            if (type === "ticket") {
                data.ticketlog = "notset";
                await data.save();
            }
            if (type === "davetlog") {
                data.davetlog = "notset";
                await data.save();
            }
            interaction.reply({ content: "Kanal ayarlandı!", ephemeral: true });


}}
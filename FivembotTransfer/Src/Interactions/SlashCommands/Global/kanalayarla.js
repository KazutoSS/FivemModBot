const { ApplicationCommandOptionType ,ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField,ChannelType } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "logkanalayarla",
    options: [{
        name: "channel",
        type: ApplicationCommandOptionType.Channel,
        description: "Kanal seç.",
        channel_types: [ChannelType.GuildText],
        required: true
    },
    {
        name: "type",
        type: ApplicationCommandOptionType.String,
        description: "Kanal tipi seç.",
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
            },
            {
                name: "rolver",
                value: "rolver"
            },
            {
                name: "rolal",
                value: "rolal"
            },
            {
                name: "kayitodasi",
                value: "kayitodasi"
            },
            {
                name: "destekodasi",
                value: "destekodasi"
            },
            {
                name:"ts3bilgi",
                value:"ts3bilgi"
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
        const channel = interaction.options.getChannel("channel");
        const type = interaction.options.getString("type");
        if (type === "gelen-giden") {

            data.gelengidenkanal = channel.id;
            await data.save();

        }
        if (type === "otorol") {

            data.otorolkanal = channel.id;
            await data.save();

        }
        /*
        if (type === "guvenlik") {
                data.guvenliklog = channel.id;
                await data.save();    
            } */
            if (type === "mod") {
                data.modlog = channel.id;
                await data.save();
            }
            if (type === "ses") {
                data.seslog = channel.id;
                await data.save();
            }
            if (type === "kufur") {
                data.kufurlog = channel.id;
                await data.save();
            }
            if (type === "reklam") {
                data.reklamlog = channel.id;
                await data.save();
            }
            if (type === "ticket") {
                data.ticketlog = channel.id;
                await data.save();
            }
            if (type === "davetlog") {
                data.davetlog = channel.id;
                await data.save();
            }
            if (type === "rolver") {
                data.rollogverme = channel.id;
                await data.save();
            }
            if (type === "rolal") {
                data.rollogalma = channel.id;
                await data.save();
            }
            if (type === "kayitodasi") {
                data.kayitodasi = channel.id;
                await data.save();
            }
            if (type === "destekodasi") {
                data.destekodasi = channel.id;
                await data.save();
            }
            if (type === "ts3bilgi") {
                data.ts3Kanal = channel.id;
                await data.save();
            }
            interaction.reply({ content: "Kanal ayarlandı!", ephemeral: true });


}}
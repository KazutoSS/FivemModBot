const { ApplicationCommandOptionType ,ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "digerayarlar",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name: "servername",
        type: ApplicationCommandOptionType.String,
        description: "Sunucu ismini değiştirir.",
        required: false
    },
    {
        name: "serverip",
        type: ApplicationCommandOptionType.String,
        description: "Sunucu ip adresini değiştirir.",
        required: false
    },
    {
        name: "ts3ip",
        type: ApplicationCommandOptionType.String,
        description: "Sunucu ts3 ip adresini değiştirir.",
        required: false
    },
    {
        name: "aktifresmi",
        type: ApplicationCommandOptionType.String,
        description: "Resmi değiştirir.",
        required: false
    },
    {
        name: "bakimresmi",
        type: ApplicationCommandOptionType.String,
        description: "Resmi değiştirir.",
        required: false
    },
    {
        name: "restartresmi",
        type: ApplicationCommandOptionType.String,
        description: "Resmi değiştirir.",
        required: false
    },
    {
        name: "discordavet",
        type: ApplicationCommandOptionType.String,
        description: "Discord Davet Adresi",
        required: false
    }],
    description: "Sunucunun dieğr ayarlarını değiştirir.",
    run: async (client, interaction) => {

        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if (!interaction.member.roles.cache.has(data.yetkilirol) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });

        const servername = interaction.options.getString("servername");
        const serverip = interaction.options.getString("serverip");
        const ts3ip = interaction.options.getString("ts3ip");
        const aktifresmi = interaction.options.getString("aktifresmi");
        const bakimresmi = interaction.options.getString("bakimresmi");
        const restartresmi = interaction.options.getString("restartresmi");
        const discordavet = interaction.options.getString("discordavet");

        if (servername) {
            data.serverName = servername;
            await data.save();
            
        }
        if (serverip) {
            data.serverIp = serverip;
            await data.save();

        }
        if (ts3ip) {
            data.ts3Ip = ts3ip;
            await data.save();

        }
        if (aktifresmi) {
            data.aktifresmi = aktifresmi;
            await data.save();

        }
        if (bakimresmi) {
            data.bakimresim = bakimresmi;
            await data.save();

        }
        if (restartresmi) {
            data.restartresim = restartresmi;
            await data.save();

        }
        if (discordavet) {
            data.discorddavet = discordavet;
            await data.save();

        }

        interaction.reply({ content: "Sunucu ayarları değiştirildi!", ephemeral: true });
    }}
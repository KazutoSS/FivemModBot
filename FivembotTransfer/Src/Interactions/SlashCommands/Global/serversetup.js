const { ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder,PermissionsBitField } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "sunucu-kurulum",
    type: ApplicationCommandType.ChatInput,
    description: "Sunucuyu databaseye ekler",
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });
        // Check if server ID added to database
        const check = await database.findOne({ serverID: interaction.guild.id });
        if (check) return interaction.reply({ content: "Bu sunucu zaten veritabanında kayıtlı.", ephemeral: true });
        if(!check){
            // Add server to database
            const newServer = new database({
                serverID: interaction.guild.id,
                serverName: interaction.guild.name,
                serverIp: "notset",
                cfxCode: "notset",
                ts3Ip: "notset",
                ts3Port: "notset",
                ts3Kanal: "notset",
                launcherKanal: "notset",
                rollogalma: "notset",
                rollogverme: "notset",
                aktifresmi: "notset",
                bakimresim: "notset",
                restartresim: "notset",
                discorddavet: "notset",
                yetkilirol: "notset",
                developerrol: "notset",
                rolyetkilisi: "notset",
                destekyetklirol: "notset",
                kayityetkilirol: "notset",
                gelengidenkanal: "notset",
                otorolkanal: "notset",
                guvenliklog: "notset",
                modlog: "notset",
                seslog: "notset",
                kufurlog: "notset",
                reklamlog: "notset",
                ticketlog: "notset",
                davetlog: "notset",
                icyetkili: "notset",
                ticketkategori: "notset",
                kayitodasi:"notset",
                destekodasi:"notset",
                lasticket: 0,
                otorol: "notset",
            });
            await newServer.save();

            interaction.reply({ content: "Sunucu başarıyla veritabanına eklendi.", ephemeral: true });

        }
        


    

}}
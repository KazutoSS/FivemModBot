const { ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField,ButtonBuilder } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
module.exports = {
    name: "aktif",
    type: ApplicationCommandType.ChatInput,
    description: "Sunucu Aktif",
    run: async (client, interaction) => {
        // Connect to database and check user has yetkilirol
        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if (!interaction.member.roles.cache.has(data.yetkilirol) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });

        // Create embed that includes aktifresmi


        const joinbtn = new ActionRowBuilder()
        if(data.serverIp == "notset"){

        }else{
            joinbtn.addComponents(
                new ButtonBuilder()
                    .setStyle("Link")
                    .setLabel("Tıkla Sunucuya Bağlan")
                    .setURL(`https://yonlendir.switchalpha.dev?fivem=${data.serverIp}`)
                    .setEmoji("🎮")
            )
        }
        if(data.ts3Ip == "notset"){}else{


            joinbtn.addComponents(
                new ButtonBuilder()
                    .setStyle("Link")
                    .setLabel("Tıkla TS3'e Bağlan")
                    .setURL(`https://yonlendir.switchalpha.dev?ts3=${data.ts3Ip}`)
                    .setEmoji("🎤")
            
            );

        }



try{
        const embed = new EmbedBuilder()
            .setTitle("Sunucu Aktif")
            .setDescription(`**${data.serverName}** sunucu aktif, giriş yapabilirsiniz\n\nSaltychat Bilgi: <#${data.ts3Kanal}>\n\nSunucu IP: **${data.serverIp}**\nTS3 IP: **${data.ts3Ip}**\n\nHızlı bağlanmak için kısayol butonlarını tercih edebilirsiniz!`)
            .setImage(data.aktifresmi)
            .setColor(0x00ff00)
            .setTimestamp();
        interaction.channel.send({ content: "@everyone",embeds: [embed], components: [joinbtn] });
        interaction.reply({ content: "Sunucu aktif edildi!", ephemeral: true });
}catch(err){

    interaction.channel.send({ content: "Sunucu aktif edildi!" });
    interaction.reply({ content: "Sunucu aktif edildi!", ephemeral: true });

}

}}
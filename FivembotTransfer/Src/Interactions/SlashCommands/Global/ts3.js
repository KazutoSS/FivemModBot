const serverdb = require("../../../Structures/Schema/servers");
const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports = {
    name: "ts3",
    type: ApplicationCommandType.ChatInput,
    description: "Sunucu TS3",
    run: async (client, interaction) => {

        const data = await serverdb.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if(data.ts3Ip == "notset"){
            interaction.reply({ content: "Sunucu için TS3 IP adresi ayarlanmamış!", ephemeral: true });
        }  else {

            const joinbtn = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle("Link")
                        .setLabel("Tıkla Bağlan")
                        .setURL(`https://yonlendir.switchalpha.dev?ts3=${data.ts3Ip}`)
                );

            const embed = new EmbedBuilder()
                .setTitle("TS3")
                .setDescription(`TS3 IP Adresi: ${data.ts3Ip}`)
                .setColor(0x00ff00)
                .setTimestamp();
            interaction.channel.send({ embeds: [embed], components: [joinbtn] });


            interaction.reply({ content: `TS3 IP Adresi: ${data.ts3Ip}`, ephemeral: true });
        }




    }}

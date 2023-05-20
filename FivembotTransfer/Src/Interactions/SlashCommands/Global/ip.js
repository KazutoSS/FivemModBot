const serverdb = require("../../../Structures/Schema/servers");
const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports = {
    name: "ip",
    type: ApplicationCommandType.ChatInput,
    description: "Fivem IP adresi",
    run: async (client, interaction) => {

        const data = await serverdb.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if(data.serverIp == "notset"){
            interaction.reply({ content: "Sunucu için fivem IP adresi ayarlanmamış!", ephemeral: true });
        }  else {

            const joinbtn = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle("Link")
                        .setLabel("Tıkla Bağlan")
                        .setURL(`https://yonlendir.switchalpha.dev?fivem=${data.serverIp}`)
                );

            const embed = new EmbedBuilder()
                .setTitle("Fivem IP")
                .setDescription(`Fivem IP Adresi: ${data.serverIp}`)
                .setColor(0x00ff00)
                .setTimestamp();
            interaction.channel.send({ embeds: [embed], components: [joinbtn] });


            interaction.reply({ content: `Fivem IP Adresi: ${data.serverIp}`, ephemeral: true });
        }




    }}

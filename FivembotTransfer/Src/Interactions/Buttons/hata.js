const anadata = require("../../Structures/Schema/servers");
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType
  } = require("discord.js");
module.exports = {
    name : 'hatareport',
    returnErrors: false,
    run : async(client, interaction) => {
        const veri = await anadata.findOne({serverID: interaction.guild.id});
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('ticketclosebtn')
            .setLabel('Ticketi Kapat')
            .setStyle('Secondary')
            .setEmoji('🔒')
        );

        if(veri.ticketkategori == "notset") return interaction.reply({ content: 'Ticket kategorisi ayarlanmamış!', ephemeral: true });

        if(veri){
            const channel = await interaction.guild.channels.create({
                name: `ticket-${veri.lasticket}`,
                type: ChannelType.GuildText,
                parent: veri.ticketkategori,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel', 'SendMessages'],
                    },
                    {
                        id: veri.developerrol,
                        allow: ['ViewChannel', 'SendMessages'],
                    },
                    {
                        id: veri.yetkilirol,
                        allow: ['ViewChannel', 'SendMessages'],
                    }
                ],
            });
            interaction.reply({ content: 'Ticket <#' + channel + ">" + " kanalında açıldı", ephemeral: true });
            // Send Message
            const embed = new EmbedBuilder()
                .setTitle(`Hata Bildiri Ticketı`)
                .setDescription(`Ticketınız başarıyla oluşturuldu. Lütfen yetkili ekibimize sorunun ne olduğu hakkında bilgi verin. En kısa sürede yardımcı olmaya çalışacağız.`)
                .setColor('#FF0000')
                .setTimestamp();
            channel.send({ embeds: [embed], components: [row] });
            channel.send({ content: `<@${interaction.user.id}> tarafından oluşturuldu.` });
            veri.lasticket +=1;
            await veri.save();
        }else{
            interaction.reply("Database Error!")
        }
          


    }
}
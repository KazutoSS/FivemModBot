const anadata = require("../../Structures/Schema/servers");
const fs = require('fs');
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType
  } = require("discord.js");
module.exports = {
    name : 'ticketclosebtn',
    returnErrors: false,
    run : async(client, interaction) => {
        interaction.reply("Ticket kapatıldı!");
        const channel = interaction.channel;
        const permissions = channel.permissionOverwrites.cache;

        permissions.forEach(role => {

            if(role.type == 1){
                interaction.guild.members.fetch(role.id).then(user => {

                interaction.channel.permissionOverwrites.edit(user, { "ViewChannel": false })
                });
            }
            
        });

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('transcript')
            .setLabel('Transkript')
            .setStyle('Success')
            .setEmoji('📄'),
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('ticketsil')
            .setLabel('Ticketi Sil')
            .setStyle('Danger')
            .setEmoji('🗑️')
        );
        const embed = new EmbedBuilder()
        .setTitle(`Yetkili Kontrolleri`)
        .setDescription(`Bu kanalı kullanıcılar artık göremiyor!`)
        .setColor('#FF0000')
        .setTimestamp();
        interaction.channel.send({ embeds: [embed], components: [row] });
    }
}
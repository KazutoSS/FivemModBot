const serverdb = require("../../Structures/Schema/servers");
const discordTranscripts = require('discord-html-transcripts');
const fs = require('fs');
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType
  } = require("discord.js");
module.exports = {
    name : 'transcript',
    returnErrors: false,
    run : async(client, interaction) => {

        const data = await serverdb.findOne({serverID: interaction.guild.id});

        if(data.ticketlog == "notset") return interaction.reply({ content: 'Ticket log kanalı ayarlanmamış!', ephemeral: true });

              interaction.reply("Transkript oluşturuldu!");


              const kanalim = interaction.channel

              const attachment = await discordTranscripts.createTranscript(kanalim);
      
              const oda = interaction.guild.channels.cache.get(data.ticketlog)
      
              const ping = new EmbedBuilder()
              .setColor('#FF0000')
              .setTimestamp()
              .setTitle('Ticket Kayıt Edildi!')
              .setDescription(`TicketID: ${interaction.channel.name}`);
             oda.send({
                  embeds: [ping]
              })
              oda.send({
                  files: [attachment]
              })

    }
}
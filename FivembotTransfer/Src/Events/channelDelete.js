const server = require("../Structures/Schema/servers")
const {AuditLogEvent, EmbedBuilder, ChannelType} = require("discord.js");

module.exports = {
    name: "channelDelete",
    run: async(channel,client) => {
        let serverData = await server.findOne({ serverID: channel.guild.id });
        if (!serverData) return;
        if (!serverData.modlog == "notset"){
        }else{
            // Get member who created the channel
            const log = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete, limit: 1 })
                .then(audit => audit.entries.first())
                .catch(() => null);
            const member = log ? channel.guild.members.cache.get(log.executor.id) : null;
            // Get the log channel
            const channeln = channel.guild.channels.cache.get(serverData.modlog);

            // Get the channel type
            let kanaltipi = "Bilinmiyor";
            if (channel.type == ChannelType.GuildText) kanaltipi = "Yazı Kanalı";
            if (channel.type == ChannelType.GuildVoice) kanaltipi = "Ses Kanalı";
            if (channel.type == ChannelType.GuildCategory) kanaltipi = "Kategori";
            if (channel.type == ChannelType.GuildStageVoice) kanaltipi = "Sesli Konferans Kanalı";
            if (channel.type == ChannelType.GuildForum) kanaltipi = "Forum Kanalı";



            // Create the embed
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setAuthor({name:"Bir Kanal Silindi!",iconURL: channel.guild.iconURL()})
                .addFields({name:"Kanal:",value: channel.name,inline: true})
                .addFields({name:"Kanal Tipi:",value: kanaltipi,inline: true})
                .addFields({name:"Oluşturan",value: member ? member.toString() : "Bilinmiyor",inline: true})
                .setTimestamp();
            // Send the embed
            channeln.send({embeds: [embed]});
        }
    }
}
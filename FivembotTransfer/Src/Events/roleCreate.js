const server = require("../Structures/Schema/servers")
const {AuditLogEvent, EmbedBuilder} = require("discord.js");

module.exports = {
    name: "roleCreate",
    run: async(role,client) => {
        let serverData = await server.findOne({ serverID: role.guild.id });
        if (!serverData) return;
        if (!serverData.modlog == "notset"){
        }else{
            // Get member who created the role
            const log = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleCreate, limit: 1 })
                .then(audit => audit.entries.first())
                .catch(() => null);
            const member = log ? role.guild.members.cache.get(log.executor.id) : null;
            // Get the log channel
            const channel = role.guild.channels.cache.get(serverData.modlog);
            // Create the embed
            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setAuthor({name:"Bir rol Oluşturuldu",iconURL: role.guild.iconURL()})
                .addFields({name:"Rol:",value: `<@&${role.id}>`,inline: true})
                .addFields({name:"Oluşturan",value: member ? member.toString() : "Bilinmiyor",inline: true})
                .setTimestamp();
            // Send the embed
            channel.send({embeds: [embed]});
        }
    }
}
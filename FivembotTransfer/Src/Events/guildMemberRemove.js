const server = require("../Structures/Schema/servers")

module.exports = {
    name: "guildMemberRemove",
    run: async(member,client) => {
        // Check if gelengidenkanal is set
        let serverData = await server.findOne({ serverID: member.guild.id });
        if (!serverData) return;
        if (!serverData.gelengidenkanal == "notset"){

        }else{
            let channel = member.guild.channels.cache.get(serverData.gelengidenkanal);
            if (!channel) return;
            channel.send(`**${member.user.tag}** adlı kullanıcı sunucudan çıktı!\nSunucumuzda **${member.guild.memberCount}** kişi var!\nHesap oluşturulma tarihi: **${member.user.createdAt}**\nKullanıcı IDSI: **${member.user.id}**`)
        }



    }
}
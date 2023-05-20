const server = require("../Structures/Schema/servers")
const {Collection, EmbedBuilder} = require("discord.js");


module.exports = {
    name: "guildMemberAdd",
    run: async(member,client) => {
        // Check if gelengidenkanal is set
        let serverData = await server.findOne({ serverID: member.guild.id });
        if (!serverData) return;
        if (!serverData.otorol == "notset"){

        }else{
            let role = member.guild.roles.cache.get(serverData.otorol);
            if (!role){}else{
                member.roles.add(role)
            }
            if(serverData.otorolkanal == "notset"){}else{
                let channel = member.guild.channels.cache.get(serverData.otorolkanal);
                if (!channel){}else{
                    channel.send(`**${member.user.tag}** adlı kullanıcıya başarıyla **${role.name}** rolü verildi!`)
                }

            }

        }
        if (!serverData.gelengidenkanal == "notset"){

        }else{
            let channel = member.guild.channels.cache.get(serverData.gelengidenkanal);
            if (!channel) return;
            channel.send(`**${member.user.tag}** adlı kullanıcı sunucuya katıldı!\nSunucumuzda **${member.guild.memberCount}** kişi var!\nHesap oluşturulma tarihi: **${member.user.createdAt}**\nKullanıcı IDSI: **${member.user.id}**`)
        }
        if (!serverData.davetlog == "notset"){}else{
            let channel = member.guild.channels.cache.get(serverData.davetlog);
  const newInvites = await member.guild.invites.fetch()
  const oldInvites = client.invites.get(member.guild.id);
  const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
  const inviter = await client.users.fetch(invite.inviter.id);
  const logChannel = channel


  const embed = new EmbedBuilder()
    .setColor(0x00FF00)
    .setAuthor({name:"Bir kullanıcı katıldı",iconURL: member.guild.iconURL()})
    .addFields({name:"Kullanıcı:",value: "<@" + member.user.id + ">",inline: true})
    .addFields({name:"Davet eden",value: inviter ? "<@" + inviter.id +">" : "Bilinmiyor",inline: true})
    .addFields({name:"Davet Kodu",value: invite.code,inline: true})
    .setTimestamp();
    // Send the embed
    logChannel.send({embeds: [embed]});
}



    }
}
const server = require("../Structures/Schema/servers")
const {AuditLogEvent, EmbedBuilder} = require("discord.js");

module.exports = {
    name: "voiceStateUpdate",
    run: async(oldState, newState,client) => {

        const data = await server.findOne({ serverID: oldState.guild.id });
        if(data){
            if(data.seslog == "notset"){

            }else{


                if(oldState.channel == null && newState.channel !== null) {
                    const joinembed = new EmbedBuilder()
                    .setTitle("Bir kullanıcı ses kanalına katıldı!")
                    .setDescription(`**${newState.member.user.tag}** adlı kullanıcı **${newState.channel.name}** adlı ses kanalına katıldı!`)
                    .setColor(0x00ff00)
                    .setTimestamp();
                    client.channels.cache.get(data.seslog).send({embeds: [joinembed]});
                    
                }
        
                if(oldState.channel !== null && newState.channel == null) {
                    const leaveembed = new EmbedBuilder()
                    .setTitle("Bir kullanıcı ses kanalından ayrıldı!")
                    .setDescription(`**${oldState.member.user.tag}** adlı kullanıcı **${oldState.channel.name}** adlı ses kanalından ayrıldı!`)
                    .setColor(0xff0000)
                    .setTimestamp();
                    client.channels.cache.get(data.seslog).send({embeds: [leaveembed]});
                    
                }
        
                if(oldState.channel !== null && newState.channel !== null) {
                    const moveembed = new EmbedBuilder()
                    .setTitle("Bir kullanıcı başka bir ses kanalına geçti!")
                    .setDescription(`**${oldState.member.user.tag}** adlı kullanıcı **${oldState.channel.name}** adlı ses kanalından **${newState.channel.name}** adlı ses kanalına taşındı!`)
                    .setColor(0xff0000)
                    .setTimestamp();
                    client.channels.cache.get(data.seslog).send({embeds: [moveembed]});
                }
    
            }
        }





    }
}
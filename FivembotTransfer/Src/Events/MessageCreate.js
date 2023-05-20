const database = require("../Structures/Schema/servers");
const udatabase = require("../Structures/Schema/users");
const { prefix } = require("../Credentials/Config");
const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const commandOptionsProcessor = require("../Structures/CommandOptions/Processor");
const {kufurler} = require("../Credentials/Config")
module.exports = {
    name: "messageCreate",
    run: async(message, client) => {
        if (!Array.isArray(prefix)) return;
        prefix.forEach(async botPrefix => {
            if (!message.content.startsWith(botPrefix)) return;
            const commandName = message.content.toLowerCase().slice(botPrefix.length).trim().split(" ")[0];
            const command = client.messageCommands.get(commandName) ?? client.messageCommands.get(client.messageCommandsAliases.get(commandName));
            if (!command) return;
            const args = message.content.slice(botPrefix.length).trim().slice(commandName.length).trim().split(" ");
            const authenticatedCMDOptions = await commandOptionsProcessor(client, message, command, false, "MessageCommand");
            
            if (command.allowInDms) {
                if (authenticatedCMDOptions) return await command.run(client, message, args);
            } else if (!message.guild) return;
            else if (command.allowBots) {
                if (authenticatedCMDOptions) return await command.run(client, message, args);
            } else if (message.author.bot) return;
            else if (authenticatedCMDOptions) return await command.run(client, message, args);
        });

        const data = await database.findOne({ serverID: message.guild.id });
        if (!data) return;
        if (message.author.bot) return;
        if(data.reklamlog == "notset"){return;}else{
            // Regex
            const regex = /(https:\/\/)?(www\.)?(((discord(app)?)?\.com\/invite)|((discord(app)?)?\.gg))\/(?<invite>.+)/gm
            const str = message.content;
            if(regex.exec(str)){
                if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                    const embed = new EmbedBuilder()
                    .setTitle("Bir admin davet linki gönderdi!")
                    .addFields({name:"Kişi",value: `<@${message.author.id}>`, inline : true})
                    .addFields({name:"Kullanıcı Adı",value: `${message.author.username}`, inline : true})
                    .addFields({name:"Mesaj",value: message.content, inline : true})
                    .addFields({name:"Kanal",value: message.channel.name, inline : true})
                    .setColor(0x00ff00)
                    .setTimestamp()
                    client.channels.cache.get(data.reklamlog).send({embeds: [embed]})
                                    // Add warn to user
                const userData = await udatabase.findOne({ discordID: message.author.id });
                if(!userData){
                    const newData = new udatabase({
                        discordID: message.author.id,
                        warns: [`Reklam Yaptı  : ||${message.content}||`]
                    })
                    await newData.save()
                }else{
                    userData.warns.push(`Reklam Yaptı : ||${message.content}||`);
                    await userData.save()
                }
                }else{
                const embed = new EmbedBuilder()
                .setTitle("Reklam Engel")
                .addFields({name:"Kişi",value: `<@${message.author.id}>`, inline : true})
                .addFields({name:"Kullanıcı Adı",value: `${message.author.username}`, inline : true})
                .addFields({name:"Mesaj",value: message.content, inline : true})
                .addFields({name:"Kanal",value: message.channel.name, inline : true})
                .setColor(0x00ff00)
                .setTimestamp()
                client.channels.cache.get(data.reklamlog).send({embeds: [embed]})
                message.delete()
                // Add warn to user
                const userData = await udatabase.findOne({ discordID: message.author.id });
                if(!userData){
                    const newData = new udatabase({
                        discordID: message.author.id,
                        warns: [`Reklam Yaptı  : ||${message.content}||`]
                    })
                    await newData.save()
                }else{
                    userData.warns.push(`Reklam Yaptı : ||${message.content}||`);
                    await userData.save()
                }

                }

            }
        }

        if(data.kufurlog == "notset"){return;}else{
            const str = message.content;
            // Check if the message contains a swear word
            if(kufurler.some(word => str.includes(word))){
                if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                    const embed = new EmbedBuilder()
                    .setTitle("Bir admin küfür etti!")
                    .addFields({name:"Kişi",value: `<@${message.author.id}>`, inline : true})
                    .addFields({name:"Kullanıcı Adı",value: `${message.author.username}`, inline : true})
                    .addFields({name:"Mesaj",value: message.content, inline : true})
                    .addFields({name:"Kanal",value: message.channel.name, inline : true})
                    .setColor(0x00ff00)
                    .setTimestamp()
                    client.channels.cache.get(data.kufurlog).send({embeds: [embed]})
                                    // Add warn to user
                const userData = await udatabase.findOne({ discordID: message.author.id });
                if(!userData){
                    const newData = new udatabase({
                        discordID: message.author.id,
                        warns: [`Küfür etti : ||${message.content}||`]
                    })
                    await newData.save()
                }else{
                    userData.warns.push(`Küfür etti : ||${message.content}||`);
                    await userData.save()
                }
                }else{
                const embed = new EmbedBuilder()
                .setTitle("Küfür Engel")
                .addFields({name:"Kişi",value: `<@${message.author.id}>`, inline : true})
                .addFields({name:"Kullanıcı Adı",value: `${message.author.username}`, inline : true})
                .addFields({name:"Mesaj",value: message.content, inline : true})
                .addFields({name:"Kanal",value: message.channel.name, inline : true})
                .setColor(0x00ff00)
                .setTimestamp()
                client.channels.cache.get(data.kufurlog).send({embeds: [embed]})
                message.delete()

                // Add warn to user
                const userData = await udatabase.findOne({ discordID: message.author.id });
                if(!userData){
                    const newData = new udatabase({
                        discordID: message.author.id,
                        warns: [`Küfür etti : ||${message.content}||`]
                    })
                    await newData.save()
                }else{
                    userData.warns.push(`Küfür etti : ||${message.content}||`);
                    await userData.save()
                }


            }}

        }


    }
};

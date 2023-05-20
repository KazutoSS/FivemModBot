const { ApplicationCommandOptionType ,ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");
const database = require("../../../Structures/Schema/users");
const serverdb = require("../../../Structures/Schema/servers");
module.exports = {
    name: "uyarilar",
    type: ApplicationCommandType.ChatInput,
    options:[{
        name: "user",
        type: ApplicationCommandOptionType.User,
        description: "Kullanıcı",
        required: true
    }],
    description: "Sunucu Aktif",
    run: async (client, interaction) => {
        const user = interaction.options.getUser("user");
        const data = await database.findOne({ discordID: user.id });
        const server = await serverdb.findOne({ serverID: interaction.guild.id });
        
        // Check if user has yetkili role or admin permission
        if (!interaction.member.roles.cache.has(server.yetkilirol) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });



        // List users warns
        if (data){

            // List users warns and all warns by line by line
            const embed = new EmbedBuilder()
            .setTitle("Kullanıcı Uyarıları")
            .setDescription(`Kullanıcının ${data.warns.length} uyarısı var!`)
            .setColor(0x00ff00)
            .setTimestamp();
            for (let i = 0; i < data.warns.length; i++) {
                const element = data.warns[i];
                embed.addFields({name: `${i+1}. Uyarı:`, value: `${element}`, inline: false});
            }
            interaction.reply({ embeds: [embed] });
            

        } else {
            if (!data){
                // Create data
                const newData = new database({
                    discordID: user.id,
                    warns:[]
                });
                await newData.save();
            }
            const embed = new EmbedBuilder()
            .setTitle("Kullanıcı Uyarıları")
            .setDescription(`Kullanıcının hiç uyarısı yok!`)
            .setColor(0x00ff00)
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
        }

}}
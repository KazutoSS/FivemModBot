const { ApplicationCommandOptionType ,ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField } = require("discord.js");
const database = require("../../../Structures/Schema/servers");

module.exports = {
    name: "rolver",
    options: [
        {
            name: "user",
            type: ApplicationCommandOptionType.User,
            description: "Kullanıcı seç.",
            required: true
        },
        {
            name: "role",
            type: ApplicationCommandOptionType.Role,
            description: "Rol seç.",
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    description: "Kullanıcıya rol verir.",
    run: async (client, interaction) => {
        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        const member = interaction.options.getMember("user");
        const role = interaction.options.getRole("role");
        if (!interaction.member.roles.cache.has(data.rolyetkilisi) && !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });
        if(!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({ content: "Bu komutu kullanabilmek için \`Rolleri Yönet\` yetkisine sahip olmalıyım.", ephemeral: true });
        if(member.roles.cache.has(role.id)) return interaction.reply({ content: "Bu kullanıcı zaten bu rolde.", ephemeral: true });
        if(role.position > interaction.guild.members.me.roles.highest.position) return interaction.reply({ content: "Bu rol benden yüksek.", ephemeral: true });
        if(role.position > interaction.member.roles.highest.position) return interaction.reply({ content: "Bu rol senin en yüksek rolünden yüksek.", ephemeral: true });


        member.roles.add(role.id);
        if(data.rollogverme == "notset") {
            
    }else{
        const embed = new EmbedBuilder()
        .setTitle("Rol Verildi")
        .setDescription(`${member} kullanıcısına ${role} rolü verildi.\nYetkili: ${interaction.user}`)
        .setColor(0x00ff00)
        .setTimestamp();
        interaction.guild.channels.cache.get(data.rollogverme).send({ embeds: [embed] });
    }
    interaction.reply({ content: `${member} kullanıcısına ${role} rolü verildi.`, ephemeral: true });

}}

const serverdb = require("../../../Structures/Schema/servers");
const userdb = require("../../../Structures/Schema/users");
const {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
module.exports = {
  name: "rolayarla",
  options: [
    {
      name: "rol",
      type: ApplicationCommandOptionType.Role,
      description: "Rol seç.",
      required: true,
    },
    {
      name: "type",
      type: ApplicationCommandOptionType.String,
      description: "Rol tipi seç.",
      required: true,
      choices: [
        {
          name: "Üst Yetkili Rölü",
          value: "yetkilirol",
        },
        {
          name: "Rol verme yetkilisi",
          value: "rolyetkilisi",
        },
        {
          name: "Destek Yetkilisi",
          value: "destekyetklirol",
        },
        {
          name: "Developer Yetkilisi",
          value: "developeryetklirol",
        },
        {
          name: "Kayıt Yetkilisi",
          value: "kayityetkilirol",
        },
        {
          name: "IC yetkili",
          value: "icyetkili",
        },
        {
          name: "otorol",
          value: "otorol",
        },
      ],
    },
    {
      name: "kaldir",
      type: ApplicationCommandOptionType.Boolean,
      description: "Rolü kaldır.",
      required: false,
    },
  ],
  type: ApplicationCommandType.ChatInput,
  description: "Rol ayarlarını yapar",
  run: async (client, interaction) => {
    const role = interaction.options.getRole("rol");
    const type = interaction.options.getString("type");
    var kaldir = false;
    try{
        kaldir = interaction.options.getBoolean("kaldir");
    }catch(e){
        console.log(e);
    }
    

    const data = await serverdb.findOne({ serverID: interaction.guild.id });
    if (!data)
      return interaction.reply({
        content: "Sunucu veritabanında bulunamadı!",
        ephemeral: true,
      });
    if (
      !interaction.member.roles.cache.has(data.yetkilirol) &&
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({
        content: "Bu komutu kullanmak için yetkin yok.",
        ephemeral: true,
      });

    if (type == "yetkilirol") {
      if (kaldir) {
        data.yetkilirol = "notset";
        await data.save();
        interaction.reply({
          content: "Yetkili rolü başarıyla kaldırıldı.",
          ephemeral: true,
        })}else{
        data.yetkilirol = role.id;
        await data.save();
        interaction.reply({
          content: "Yetkili rolü başarıyla ayarlandı.",
          ephemeral: true,
        })};
      }
      if (type == "rolyetkilisi") {
        if (kaldir) {
          data.rolyetkilisi = "notset";
          await data.save();
          interaction.reply({
            content: "Yetkili rolü başarıyla kaldırıldı.",
            ephemeral: true,
          })}else{
            data.rolyetkilisi = role.id;
            await data.save();
            interaction.reply({
              content: "Rol verme yetkilisi başarıyla ayarlandı.",
              ephemeral: true,
            });
          }
        }
        if (type == "destekyetklirol") {
          if (kaldir) {
            data.destekyetklirol = "notset";
            await data.save();
            interaction.reply({
              content: "Yetkili rolü başarıyla kaldırıldı.",
              ephemeral: true,
            })}else{
            data.destekyetklirol = role.id;
            await data.save();
            interaction.reply({
              content: "Destek yetkilisi başarıyla ayarlandı.",
              ephemeral: true,
            })};
          }
          if (type == "developeryetklirol") {
            if (kaldir) {
              data.developerrol = "notset";
              await data.save();
              interaction.reply({
                content: "Yetkili rolü başarıyla kaldırıldı.",
                ephemeral: true,
              })}else{
              data.developerrol = role.id;
              await data.save();
              interaction.reply({
                content: "Developer yetkilisi başarıyla ayarlandı.",
                ephemeral: true,
              })};
            }
          if (type == "kayityetkilirol") {
            if (kaldir) {
              data.kayityetkilirol = "notset";
              await data.save();
              interaction.reply({
                content: "Yetkili rolü başarıyla kaldırıldı.",
                ephemeral: true,
              })}else{
              data.kayityetkilirol = role.id;
              await data.save();
              interaction.reply({
                content: "Kayıt yetkilisi başarıyla ayarlandı.",
                ephemeral: true,
              })};
            }
            if (type == "icyetkili") {
              if (kaldir) {
                data.icyetkili = "notset";
                await data.save();
                interaction.reply({
                  content: "Yetkili rolü başarıyla kaldırıldı.",
                  ephemeral: true,
                })}else{
                data.icyetkili = role.id;
                await data.save();
                interaction.reply({
                  content: "IC yetkili başarıyla ayarlandı.",
                  ephemeral: true,
                })};
              }
              if (type == "otorol") {
                if (kaldir) {
                  data.otorol = "notset";
                  await data.save();
                  interaction.reply({
                    content: "Otorol başarıyla kaldırıldı.",
                    ephemeral: true,
                  })}else{
                  data.otorol = role.id;
                  await data.save();
                  interaction.reply({
                    content: "Otorol başarıyla ayarlandı.",
                    ephemeral: true,
                  });
                }
              }
            }
          };
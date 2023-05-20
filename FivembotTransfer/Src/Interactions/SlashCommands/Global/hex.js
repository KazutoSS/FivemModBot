const { ApplicationCommandType,ApplicationCommandOptionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField, ButtonBuilder,ButtonStyle } = require("discord.js");
const database = require("../../../Structures/Schema/servers");
const { steamAPIkey } = require("../../../Credentials/Config");
const axios = require('axios');
const url = require('url');
module.exports = {
    name: "hex",
    options: [{
        name: "text",
        type: ApplicationCommandOptionType.String,
        description: "Steam link",
        required: true
    }],
    type: ApplicationCommandType.ChatInput,
    description: "Steam linkinden hex almanızı sağlar",
    run: async (client, interaction) => {



        // Connect to database and check user has yetkilirol
        const string = interaction.options.getString("text");
        const profileUrl = string;
        const data = await database.findOne({ serverID: interaction.guild.id });
        if (!data) return interaction.reply({ content: "Sunucu veritabanında bulunamadı!", ephemeral: true });
        if (!interaction.member.roles.cache.has(data.yetkilirol) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Bu komutu kullanmak için yetkin yok.", ephemeral: true });

try{
    
    var steamID64 = null;

    function isCustomProfileUrl(profileUrl) {
        const urlObj = url.parse(profileUrl);
        const segments = urlObj.pathname.split('/');
        if (segments.length >= 3) {
          if (segments[1] === 'id' && segments[2] !== '') {
            return true;
          }
          if (segments[1] === 'profiles' && segments[2].length === 17 && /^\d+$/.test(segments[2])) {
            return false;
          }
        }
        return false;
      }
      
      if(isCustomProfileUrl(profileUrl) == false){
        steamID64 = profileUrl.match(/(\d+)/)[0];
      }else{
        await axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamAPIkey}&vanityurl=${url.parse(profileUrl).pathname.slice(4, -1)}`)
        .then(response => {
          if (response.data.response.success === 1) {
            steamID64 = response.data.response.steamid;
          } else {
            console.log(`Failed to resolve custom URL: ${response.data.response.message}`);
          }
        })
        .catch(error => {
          console.log(`Failed to resolve custom URL: ${error.message}`);
        });
      }

interaction.reply({ content: "Kullanıcının HEX IDSI: " + BigInt(steamID64).toString(16), ephemeral: false });

}catch(err){

console.log(err)

}

}}
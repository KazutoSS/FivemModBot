module.exports = {
    name : 'ticketsil',
    returnErrors: false,
    run : async(client, interaction) => {
        interaction.reply("Ticket 5 saniye sonra silinecek!");
        setTimeout(() => { interaction.channel.delete(); }, 5000);
    }
}
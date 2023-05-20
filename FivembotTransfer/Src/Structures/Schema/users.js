const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    discordID: String,
    warns: Array
})

module.exports = mongoose.model('users', Schema)
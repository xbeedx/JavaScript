const mongoose = require("mongoose");

const handlerSchema = mongoose.Schema({
    value: String,
    channel: String
});

module.exports = mongoose.model('twitterHandler',handlerSchema);
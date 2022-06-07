const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrl = new mongoose.Schema({
    hits: {
        type: Number,
        required: true,
        default: 0
    },
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    }
})

module.exports = mongoose.model('ShortUrl', shortUrl)


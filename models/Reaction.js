const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: mongoose.Schema.Types.ObjectId,
    reationBody: {
        type: String,
        requires: true,
        maxlength: 280,
    },
    ysername: {
        type: Date,
        default: Date.now,
        get: (timestamp) => formatDate(timestamp),
    },
});

function formatDate(timestamp) {

}

module.exports = reacitonSchema;
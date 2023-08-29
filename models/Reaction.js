const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: mongoose.Schema.Types.ObjectId,
    reationBody: {
        type: String,
        requires: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        defualt: Date.now,
        get: (timestamp) => formateDate(timestamp),
    },
});

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    return date.toLocaleDateString(undefined, options);
}   

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
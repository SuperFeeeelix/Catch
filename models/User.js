const mongoose = require('mongoose');

const userSchema = New mongoose.Schema ({
    username: {
        type: String,
        unique: true, 
        required: true,
        trim: true,
    },
    email: {
        type: Sting,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        
    },

    thoughts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
    },
    friends: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

});






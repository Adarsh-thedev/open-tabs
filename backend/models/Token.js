const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'users' 
    },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = Token = mongoose.model('token',tokenSchema);
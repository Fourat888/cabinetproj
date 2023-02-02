const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new
    Schema(
        {
            
            Nom: String,
            Prenom: String,
            Email :{type: String, unique: true},
            Numtel: String,
            Password:String,
            verified: { type: Boolean, default: false },
            Role:String,
        },
        {
            timestamps: true
        }
    );
module.exports = mongoose.model('User', User);
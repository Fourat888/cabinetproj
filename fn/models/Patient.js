const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Patient = new
    Schema(
        {
            Nom: String,
            Prenom: String,
            Date: String,
            Sexe: String,
            Addresse: String,
            Numtel: String,

        }
    );
module.exports = mongoose.model('Patient', Patient);
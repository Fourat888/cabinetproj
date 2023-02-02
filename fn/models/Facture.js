const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Facture = new
    Schema(
        {
            Date: String,
            Montantpaye: String,
            Restpaye:String,
            Patient: { type: Schema.Types.ObjectId, ref: "Patient" },
        }
    );
module.exports = mongoose.model('Facture', Facture);
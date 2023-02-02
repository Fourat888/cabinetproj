const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RDV = new
    Schema(
        {
            Patient: { type: Schema.Types.ObjectId, ref: "Patient" },
            Date: String,
            Heure: String,
         
        }
    );
module.exports = mongoose.model('RDV', RDV);
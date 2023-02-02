const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DossierPatient = new
    Schema(
        {
            DateCreation: String,
            Couttotal:String,
            Duree:String,
            Patient: { type: Schema.Types.ObjectId, ref: "Patient" },
        }
    );
module.exports = mongoose.model('DossierPatient', DossierPatient);
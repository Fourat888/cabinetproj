const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Consultation = new
    Schema(
        {
            Date: String,
            Etatactuelle: String,
            Actionjour:String,
            Decision:String,
            Patient: { type: Schema.Types.ObjectId, ref: "Patient" },
            
        }
    );
module.exports = mongoose.model('Consultation', Consultation);
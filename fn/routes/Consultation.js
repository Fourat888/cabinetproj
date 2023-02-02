
var express = require('express');
var router = express.Router();
var Consultation = require('../models/Consultation')
router.get('/', function (req, res, next) {
 
  // var dateTime = new Date();
  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // console.log(dateTime.toLocaleDateString('EN-EN', options))
  Consultation.find(
          (err, Consultations) => { res.send(Consultations) }
        ).populate("Patient");
  });
  
  
  router.post('/add', async (req, res) => {
    
    try {
      await Consultation.create({
       
              Patient :req.body.Patient,
              Etatactuelle :req.body.Etatactuelle,
              Actionjour: req.body.Actionjour,
              Decision: req.body.Decision,
              Date: req.body.Date,

      })
      res.json({ status: 'ok' })
    } catch (err) {
      res.json({ status: 'error', error: 'Duplicate email' })
    }
 
  });
  router.post('/edit/:id', function (req, res, next) {
    console.log("edit");
    console.log(req.body);
    console.log("######");
  
    Consultation.exists({ _id: req.params.id },
      (err, result) => { /*  */
        console.log("result " + result); /* res.json(contacts)  */
        console.log(result);
  
        if (result) {
          console.log("true");
          Consultation.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            console.log(data);
            // res.redirect('/contact');
            res.json(" : Contact :" + Consultation._id + " updated"); 

          });
          // res.json(result)
        } else {
          console.log("false");
          res.json(result)
  
        }
  
      }
    );
  
  });
  
  router.get('/delete/:id', function (req, res, next) {
    Consultation.findByIdAndDelete(req.params.id,
      (err, data) => {
        console.log(data);
        /* return res.status(200).send("deleted").end(); */
        // res.redirect('/contact');
        res.json(" : Contact  deleted"); 

      }
    );
  });

    
  router.get('/find/:id', function (req, res, next) {
    Consultation.findById(req.params.id,
      (err, Consultations) => { res.json(Consultations); }
    ).populate("Patient");
  });
  
  module.exports = router;
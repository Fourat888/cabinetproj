
var express = require('express');
var router = express.Router();
var Patient = require('../models/Patient')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
router.get('/', function (req, res, next) {
 
  // var dateTime = new Date();
  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // console.log(dateTime.toLocaleDateString('EN-EN', options))
  Patient.find(
          (err, Patients) => { res.send(Patients) }
        );
  });
  
  
  router.post('/add', async (req, res) => {
    
    try {
      await Patient.create({
        Nom :req.body.Nom,
        Prenom :req.body.Prenom,
        Nom: req.body.Nom,
        Date: req.body.Date,
        Sexe: req.body.Sexe,
        Addresse: req.body.Addresse,
        Numtel: req.body.Numtel,
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
  
    Patient.exists({ _id: req.params.id },
      (err, result) => { /*  */
        console.log("result " + result); /* res.json(contacts)  */
        console.log(result);
  
        if (result) {
          console.log("true");
          Patient.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            console.log(data);
            // res.redirect('/contact');
            res.json(" : Contact :" + Patient._id + " updated"); 

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
    Patient.findByIdAndDelete(req.params.id,
      (err, data) => {
        console.log(data);
        /* return res.status(200).send("deleted").end(); */
        // res.redirect('/contact');
        res.json(" : Contact  deleted"); 

      }
    );
  });
  router.get('/findallbyid/:id', async (req, res) => {
   
      const Patient = await Patient.find({ idcoach: req.params.id })

      res.send(Patient);
    });
    
  router.get('/find/:id', function (req, res, next) {
    Patient.findById(req.params.id,
      (err, Patients) => { res.json(Patients); }
    );
  });
  
  module.exports = router;
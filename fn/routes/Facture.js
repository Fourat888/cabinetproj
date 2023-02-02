
var express = require('express');
var router = express.Router();
var Facture = require('../models/Facture')
router.get('/', function (req, res, next) {
  Facture.find(
          (err, Factures) => { res.send(Factures) }
        ).populate("Patient");
  }); 
  router.post('/add', async (req, res) => {
    
    try {
      await Facture.create({
       
        Date :req.body.Date,
        Montantpaye :req.body.Montantpaye,
        Restpaye: req.body.Restpaye,
        Patient: req.body.Patient,
   
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
  
    Facture.exists({ _id: req.params.id },
      (err, result) => { /*  */
        console.log("result " + result); /* res.json(contacts)  */
        console.log(result);
  
        if (result) {
          console.log("true");
          Facture.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            console.log(data);
            // res.redirect('/contact');
            res.json(" : Contact :" + Facture._id + " updated"); 

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
    Facture.findByIdAndDelete(req.params.id,
      (err, data) => {
        console.log(data);
        /* return res.status(200).send("deleted").end(); */
        // res.redirect('/contact');
        res.json(" : Contact  deleted"); 

      }
    );
  });

    
  router.get('/find/:id', function (req, res, next) {
    Facture.findById(req.params.id,
      (err, Factures) => { res.json(Factures); }
    ).populate("Patient");
  });
  
  module.exports = router;
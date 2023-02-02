
var express = require('express');
var router = express.Router();
var DossierPatient = require('../models/DossierPatient')
router.get('/', function (req, res, next) {
  DossierPatient.find(
          (err, DossierPatients) => { res.send(DossierPatients) }
        ).populate("Patient");
  }); 
  router.post('/add', async (req, res) => {
    
    try {
      await DossierPatient.create({
       
        DateCreation :req.body.DateCreation,
        Couttotal :req.body.Couttotal,
        Duree: req.body.Duree,
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
  
    DossierPatient.exists({ _id: req.params.id },
      (err, result) => { /*  */
        console.log("result " + result); /* res.json(contacts)  */
        console.log(result);
  
        if (result) {
          console.log("true");
          DossierPatient.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            console.log(data);
            // res.redirect('/contact');
            res.json(" : Contact :" + DossierPatient._id + " updated"); 

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
    DossierPatient.findByIdAndDelete(req.params.id,
      (err, data) => {
        console.log(data);
        /* return res.status(200).send("deleted").end(); */
        // res.redirect('/contact');
        res.json(" : Contact  deleted"); 

      }
    );
  });

    
  router.get('/find/:id', function (req, res, next) {
    DossierPatient.findById(req.params.id,
      (err, DossierPatients) => { res.json(DossierPatients); }
    ).populate("Patient");
  });
  
  module.exports = router;
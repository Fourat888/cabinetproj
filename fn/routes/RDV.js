
var express = require('express');
var router = express.Router();
var RDV = require('../models/RDV')
router.get('/', function (req, res, next) {
  RDV.find(
          (err, RDVs) => { res.send(RDVs) }
        ).populate("Patient");
  }); 
  router.post('/add', async (req, res) => {
    
    try {
      await RDV.create({
       
        Date :req.body.Date,
        Heure :req.body.Heure,
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
  
    RDV.exists({ _id: req.params.id },
      (err, result) => { /*  */
        console.log("result " + result); /* res.json(contacts)  */
        console.log(result);
  
        if (result) {
          console.log("true");
          RDV.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            console.log(data);
            // res.redirect('/contact');
            res.json(" : Contact :" + RDV._id + " updated"); 

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
    RDV.findByIdAndDelete(req.params.id,
      (err, data) => {
        console.log(data);
        /* return res.status(200).send("deleted").end(); */
        // res.redirect('/contact');
        res.json(" : Contact  deleted"); 

      }
    );
  });

    
  router.get('/find/:id', function (req, res, next) {
    RDV.findById(req.params.id,
      (err, RDVs) => { res.json(RDVs); }
    ).populate("Patient");
  });
  
  module.exports = router;
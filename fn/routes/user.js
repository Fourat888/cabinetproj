
var express = require('express');
var router = express.Router();
var User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
// const multer = require('multer');
// const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const nodemailer = require("nodemailer");
router.get('/', async (req, res, next) => {
    User.find(
          (err, Users) => { res.send(Users) }
        );
  });

  // router.get('/getalltokens', async (req, res, next) => {  
  //     Token.find(
  //           (err, Tokens) => { res.send(Tokens) }
  //         );
  //   });

  router.post('/login', async (req, res)=> {

   console.log(req.body.email==="admin@gmail.com")
    if (req.body.password==="azerty123" && req.body.email==="admin@gmail.com"){
      console.log("worked")
      const token = jwt.sign(
        {
          testjwt:"admin",
        },
        'secretadmin'
      )
  console.log("madeit")
      return res.json({ status: 'ok', admin: token })
    }
    const authUser = await User.findOne({
     
      Email: req.body.email,
    })
    if (!authUser) {
			return res.status(401).send({ message: "Invalid Email or Password" , authUser: false});
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      authUser.Password
    )
    if (!isPasswordValid) 
			return res.status(401).send({ message: "Invalid Email or Password" , authUser: false});

    // if (!User.verified) {
		// 	let token = await Token.findOne({ userId: User._id });
		// 	if (!token) {
		// 		token = await new Token({
		// 			userId: User._id,
		// 			token: crypto.randomBytes(32).toString("hex"),
		// 		}).save();
    //     const url =  `http://localhost:3022/User/${User._id}/verify/${token.token}`;
    //     await sendEmail(User.Email, "Verify Email", url);
		// 	}

		// 	return res
		// 		.status(400)
		// 		.send({ message: "An Email sent to your account please verify" });
		// }
    

      const token = jwt.sign(
        {
          nom: authUser.nom,
          prenom:authUser.prenom,
        },
        'secret123'
      )
  console.log("madeit")
      return res.json({ status: 'ok', authUser: token })
  })
  router.post('/add', async (req, res) => {
        const userExists = await User.findOne({ Email :req.body.Email })
    if (userExists) return res.status(400).json({ error: "Email already exit" });
      const newPassword = await bcrypt.hash(req.body.Password, 10)
    try {
      await User.create({
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        Email: req.body.Email,
        Numtel :req.body.Numtel,
         Password:newPassword,
      })
      res.json({ status: 'ok' })
    } catch (err) {
      res.json({ status: 'error', error: 'Duplicate email' })
    }
 
    // try {
    //   console.log("d1")

    //   // const userExists = await User.findOne({ Email :req.body.Email })
    // // if (userExists) return res.status(400).json({ error: "Email already exit" });
    // //   const newPassword = await bcrypt.hash(req.body.password, 10)
      

    //   const User = await new User({
    //     Nom: req.body.Nom,
    //     Prenom: req.body.Prenom,
    //     Email: req.body.Email,
    //     Numtel :req.body.Numtel,
    //     //  Password:newPassword,
    //     Password:req.body.Password,

    //   }).save();
    //   console.log("d2")
    //   res.json({ status: 'ok' })

    //   // const token = await new Token({
    //   //   userId: User._id,
    //   //   token: crypto.randomBytes(32).toString("hex"),
    //   // }).save();
    //   // console.log("d3")

    //   // const url = `${process.env.BASE_URL}User/${userExists._id}/verify/${token.token}`;

    //   // const url =  `http://localhost:3022/User/${User._id}/verify/${token.token}`;

    //   // console.log(url);
    //   // console.log("aaaa")
    //   // await sendEmail(User.Email, "Verify Email", url);
    //   // console.log("")

    //   // res
    //   //   .status(201)
    //   //   .send({ message: "An Email sent to your account please verify" });
      
    //   } catch (err) {
    //   res.json({ status: 'error', error: 'Internal Server Error' })
    // }
 
  });
  
  router.post('/addtest', async (req, res)=> {
    console.log("add");
    console.log(req.body);
    console.log("######");
    try{
  const User = await User.create({
    Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        Email: req.body.Email,
        Numtel :req.body.Numtel,
    Password:req.body.Password,
  })
  res.send(User);
}catch(err){}
res.json({status:'ok'})
  });

  router.get("/:id/verify/:token/", async (req, res) => {
    try {
      console.log("aaa1")
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send({ message: "Invalid link" });
      console.log("aaa221")

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      console.log("aaa33")

      if (!token) return res.status(400).send({ message: "Invalid link" });
     
      await User.updateOne( {_id: user._id}, {$set : { verified: true}} );
      // await token.remove();
      console.log("aaa444")

      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Internal Server Error" });
    }
    
  });
  
  router.get('/addform', function (req, res, next) {
  
    res.render('add.twig', { title: "Add contact" });
  });
  

  
//   router.get('/edit/:id', function (req, res, next) {
  
//     User.findById(req.params.id,
//       (err, Users) => { res.render('edit.twig', { title: "Edit contact", cont: Users }); }
//     );
  
//   });
  
  router.post('/edit/:id', async  (req, res, next) => {
    console.log("edit");
    console.log(req.body);
    console.log("######");

    User.exists({ _id: req.params.id },
      (err, result) => { /*  */
        console.log("result " + result); /* res.json(contacts)  */
        console.log(result);
      
     
        if (result) {

          console.log("true");
          User.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            console.log(data);
            // res.redirect('/contact');
            res.json(" : Contact :" + User._id + " updated"); 

          });
          // res.json(result)
        } else {
          console.log("false");
          res.json(result)
  
        }
  
      }
    );
  
  });

  router.post('/edit2/:id', async  (req, res, next) => {
    try {
      const User = await User.findOne({
     
        _id: req.params.id,
      })
      console.log(User)

      const isPasswordValid = await   bcrypt.compare(
        req.body.oldpassword,
        User.Password
      )
      if (!isPasswordValid) return res.status(400).json({ error: "password already exist" });

      const newPassword = await bcrypt.hash(req.body.Password, 10)

      await User.updateOne(
        { _id: req.params.id },
        { $set: { Password: newPassword,image: req.body.image } }
      )
  
      return res.json({ status: 'ok' })
    } catch (error) {
      console.log(error)
      res.json({ status: 'error', error: 'invalid token' })
    }
    
   
  
  });



  
  router.get('/delete/:id', function (req, res, next) {
    User.findByIdAndDelete(req.params.id,
      (err, data) => {
        console.log(data);
        /* return res.status(200).send("deleted").end(); */
        // res.redirect('/contact');
        res.json(" : Contact  deleted"); 

      }
    );
  });
  

  
  router.get('/find/:id', function (req, res, next) {
    User.findById(req.params.id,
      (err, Users) => { res.json(Users); }
    );
  });






  router.get('/getUserjwt', async (req, res) => {
    const token = req.headers['x-access-token']
  
    try {
      const decoded = jwt.verify(token, 'secret123')
      const email = decoded.email
      const User = await User.findOne({ Email: email })
  
      return res.json({ status: 'ok', fullname: User.FirstName +' '+ User.Lastname , id:User.id,image:User.image })
    } catch (error) {
      console.log(error)
      res.json({ status: 'error', error: 'invalid token' })
    }
  })
  
  router.post('/postUserapi', async (req, res) => {
    const token = req.headers['x-access-token']
  
    try {
      const decoded = jwt.verify(token, 'secret123')
      const email = decoded.email
      await User.updateOne(
        { email: email },
        { $set: { quote: req.body.quote } }
      )
  
      return res.json({ status: 'ok' })
    } catch (error) {
      console.log(error)
      res.json({ status: 'error', error: 'invalid token' })
    }
  })

  // var storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //       cb(null, 'uploads/')
  //   },
  //   filename: (req, file, cb) => {
  //       cb(null, `${file.originalname}`)
  //       // cb(null, ${Date.now()}_${file.originalname})
  
  //   },
  //   fileFilter: (req, file, cb) => {
  //       const ext = path.extname(file.originalname)
  //       if (ext !== '.jpg' || ext !== '.png') {
  //           return cb(res.status(400).end('only jpg, png are allowed'), false);
  //       }
  //       cb(null, true)
  //   }
  // })
  
  // var upload = multer({ storage: storage }).single("file")
  
  router.post("/uploadImage",  (req, res) => {
  
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, images: res.req.file.path, fileName: res.req.file.filename })
    })
  
  });
  
  
  



  
  module.exports = router;
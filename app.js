const express = require('express')
const bodyParser = require('body-parser');
const next = require('next')
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const enquiryService = require('./server/enquiryService')
const sellerService = require('./server/sellerService')

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const sharp = require('sharp');

const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash');

const storage= multerS3({
  s3: new AWS.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  }),
  bucket: process.env.S3BUCKET, // Replace with your bucket name
  shouldTransform: true,
  transforms: [
    {
      id: 'thumbnail',
      key: (req, file, cb) => 
      {
        let fileFormat = '.jpg'; 
        if (file.mimetype === 'image/png') {
          fileFormat = '.png';
        } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
          fileFormat = '.jpeg';
        }
        const randomString = Math.round(Math.random() * 1E9); // Generate a random string
        const timestamp = Date.now(); // Get the current timestamp
        const filename = `${randomString}-${timestamp}-${fileFormat}`;
        cb(null, `thumbnail-${filename}`);
        // cb(null, `thumbnail-${file.originalname}`)
      },
      transform: (req, file, cb) =>
        cb(null, sharp().resize(200, 200).jpeg({ quality: 90 })),
    },
  ],
  acl: 'public-read',
});
//});
const upload = multer({ storage: storage });

server.prepare().then(() => {
  const app = express()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
  }))

  app.use(passport.initialize()) // init passport on every route call
  app.use(passport.session())    //allow passport to use "express-session"
  
  const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'daya', password: 'sudhan' },
  ];

  passport.use(new LocalStrategy((username, password, done) => {
    console.log("inside local stratergy")
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      console.log("inside local stratergy 2")
      return done(null, user);
    }
    console.log("inside local stratergy 3")
    return done(null, false, { message: 'Incorrect username or password' });
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
  });
  // app.get('/login', (req, res) => {
  //   res.render('login');
  // });
  
  app.post('/login', (req, res, next) => {
    console.log("login",req.body)
    passport.authenticate('local', (err, user, info) => {
      console.log("login2")
      if (err) {
        console.log("login3")
        return next(err);
      }
      if (!user) {
        console.log("login4")
        //req.flash('info', 'Authentication failed.'); // Set a flash message
        return res.redirect({status:"failed"});
      }
      console.log("login5")
      // Successful login logic
      return res.send({name:user.username,status:"success"})
    })(req, res, next);
    
  });
  
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  app.get('/hello', (req, res) => res.send('Namaste Home Page'));
  app.get("/items", async (req, res) => {
    res.send(await sellerService.getAllItems());
  });
  app.get('/items/:id', async (req, res) => {
    res.send(await sellerService.getItem(parseInt(req.params.id)));
  });
  app.get("/enquiries", async (req, res) => {
    res.send(await enquiryService.getAllEnquiries());
  });
  app.get("/enquiries/:id", async (req, res) => {
    console.log("req",req.params.id)
    res.send(await enquiryService.getEnquiry(parseInt(req.params.id)));
  });
  app.post("/enquiry", async (req, res) => {
    console.log('enquery request body', req.body);
    const ret = await enquiryService.insertEnuiry(req.body);
    console.log('return', ret);
    res.send(ret);
  });
 app.post('/upload', upload.array('images',10), async (req, res) => {
  //app.post("/upload", async (req, res) => {
      console.log("i am inside upload")
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No images uploaded' });
      }
      const images = req.files.map((file) => {
        return file.transforms[0].location;
      });
  
      const inputData = { ...req.body, image_urls: images };
      const ret = await sellerService.insertItem(inputData);
      console.log('return', ret);
      res.send(ret);
    });

  app.get('*', (req, res) => {
    return handle(req, res)
  })
  app.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log(`Server is listening on port ${process.env.PORT}.${process.env.DEV} `)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
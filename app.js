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
const adminService = require('./server/adminService')
const statesService = require('./server/statesService')
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const sharp = require('sharp');

const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash');
const cors = require('cors');
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
        cb(null),
    },
  ],
  acl: 'public-read',
});
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});
// Function for uploading files to S3
async function uploadToS3(buffer,key) {
  const params = {
    Bucket: process.env.S3BUCKET, // Replace with your bucket name
    Key: key,
    Body: buffer, // Specify the buffer containing the file data
    ACL: 'public-read', // Set the ACL as per your requirements
  };

  // Upload the file to the S3 bucket
  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data.Location);
    return data.Location; // Return the location of the uploaded file
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err; // Throw the error for error handling
  }
}
const mstorage = multer.memoryStorage();
const upload = multer({ storage: mstorage });
const upload2 = multer({ storage: storage });
server.prepare().then(() => {
  const app = express()
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
  }))
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });
  
  passport.deserializeUser(async (id, done) => {
   
    const user = users.find(u => u.id === id);
     done(null, user.username);
  });
  app.use(passport.initialize()) // init passport on every route call
  app.use(passport.session())    //allow passport to use "express-session"
  

 passport.use(new LocalStrategy(async (username, password, done) => {
       
    const users =  await adminService.getAllDealers();
    const user = users.find(u => u.username === username && u.password === password);
    console.log("inside local stratergy",user)
    if (user) {
      console.log("inside local stratergy 2")
      return done(null, user);
    }
    console.log("inside local stratergy 3")
    return done(null, false, { message: 'Incorrect username or password' });
  }));
  

  
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
        return res.redirect({status:"failed"});
      }
      console.log("login5")
      req.logIn(user, function(err) {})
      res.cookie('user', 'admin', {signed: false})
      req.session.user = {username : user.username ,'auntheticated':true,id:user.id};
      req.session.save(function (err) {
        if (err) {
            console.log( 'registerCustomer save error' );
           next(err);
        }
        console.log( 'registerCustomer save complete' );
      });
      console.log( 'Dayasudhan' ,req.session);
      return res.send({name:user.username,status:"success"})
    })(req, res, next);
    
  });
  
  app.get('/logout', (req, res) => {
    console.log("logout")
    req.logout(()=>{
      console.log("logout inside")
    });
    res.send('logout_success');
  });
  app.get('/hello', (req, res) => res.send('Namaste Home Page'));
  app.get("/items", async (req, res) => {
    res.send(await sellerService.getAllItems());
  });
  app.get("/items_by_page", async (req, res) => {
    console.log("req.query",req.query)
    res.send(await sellerService.getAllItems_by_page(req.query.page, req.query.pageSize));
  });
  app.get('/items/:id', async (req, res) => {
    res.send(await sellerService.getItem(parseInt(req.params.id)));
  });
  app.get('/session', async (req, res) => {
    if (req.session?.user?.auntheticated ) {
      res.send({'user':req.session?.user});
    } else {
      res.send(null);
    }
    
  });
  app.get("/enquiriesall", async (req, res) => {
    if (req.session?.user?.auntheticated ) {
      res.send(await enquiryService.getAllEnquiries());
    } else {
      res.status(403).send('Access Denied: You are not authenticated.');
    }
  });
  app.get("/enquiries", async (req, res) => {
    console.log("req.session?.user.id",req.session?.user?.id)
    if (req.session?.user?.auntheticated ) {
      res.send(await enquiryService.getEnquiriesByDealer(req.session?.user?.id));
    } else {
    res.status(403).send('Access Denied: You are not authenticated.');
    }
  });

  app.post("/enquiry", async (req, res) => {
    console.log('enquery request body', req.body);
    const ret = await enquiryService.insertEnuiry(req.body);
    console.log('return', ret);
    res.send(ret);
  });
  app.post("/dealer", async (req, res) => {
    console.log('dealer request body', req.body);
    const ret = await adminService.insertDealer(req.body);
    console.log('return', ret);
    res.send(ret);
  });
  app.get("/dealers", async (req, res) => {
      res.send(await adminService.getAllDealers());
  });

async function processAndCompressImages(req, res, next) {
  upload.array('images', 5)(req, res, async (err) => { // 'files' is the field name for multiple files
    if (err) {
      return res.status(500).send('Error uploading files.');
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    // Process and compress each image using sharp
    const processedFiles = await Promise.all(
      req.files.map(async (file) => {
        console.log("file",file )
        // Check if the file size is greater than 1MB
        if (file.size > 1024 * 1024) {
          // If it's larger than 1MB, process and compress it to 0.5MB
          const processedBuffer = await sharp(file.buffer)
            //  .resize({ width: 500, height: 500 }) // Adjust dimensions as needed
            .jpeg({ quality: 70 }) // Adjust quality as needed
            .toBuffer();
            console.log("file process",file.buffer.length,file.size /(1024 * 1024), processedBuffer.length /(1024 ),processedBuffer.length /(1024* 1024 ))
          return {
            buffer: processedBuffer,
            size: processedBuffer.length,
          };
        } else {
          return {
            buffer: file.buffer,
            size: file.size,
          };
        }
      })
    );
    req.processedFiles = processedFiles;
    next();
  });
}
    app.post('/upload', processAndCompressImages, async (req, res) => {
          console.log("processedFiles",req.processedFiles )
          const uploadedFiles = await Promise.all(
                req.processedFiles.map(async (file) => {
                try {
                let fileFormat = '.jpg'; 
                if (file.mimetype === 'image/png') {
                  fileFormat = '.png';
                } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
                  fileFormat = '.jpeg';
                }
                const randomString = Math.round(Math.random() * 1E9); // Generate a random string
                const timestamp = Date.now(); // Get the current timestamp
                const filename = `Bhoomi-${randomString}-${timestamp}${fileFormat}`;          
                const  uploadedLocation = await uploadToS3(file.buffer,
                filename
                    );
                  return uploadedLocation;
                } catch (err) {
                  // Handle errors if necessary
                  return null;
                }
              })
          );

          // Log the uploaded file locations
          console.log('Uploaded file locations:', uploadedFiles);
          if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
          }
          const dealer  = await adminService.getDealerByDistrict(req.body.district)
          const dealerId = dealer?dealer.id:4; //dealer defalt to davanagere
          const inputData = { ...req.body, image_urls: uploadedFiles ,dealerId};
          //console.log("inputData",inputData,dealerId)
          const ret = await sellerService.insertItem(inputData);
          console.log('return', ret);
          res.send(ret);
        });
  app.get('/states', async (req, res) => {
      res.send(await statesService.getStates());
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
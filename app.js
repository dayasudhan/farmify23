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
const bcrypt = require('bcrypt');
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = require("./firebase/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokens = [];
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
// Function to verify a password
async function verifyPassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
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
  // passport.deserializeUser(async (id, done) => {
  //   console.log("id",id)
  //   const user = users.find(u => u.id === id);
  //    done(null, user.username);
  // });
  passport.deserializeUser(async (id, done) => {
    console.log("id",id)
    const users =  [
      {
        id: 3,
        username: 'sanju',
        password: '$2b$10$R7dVKdOCnjX11BBBMf3roOId6BfBg2B2dkt4jUC7RO8h.c7z.LDjq',
        orgpassword: 'sanju123',
        phone: '9380586505',
        address: 'Kalagatagi',
        district: 'Dharwad',
        city: 'Kalagatagi',
        state: 'Karnataka',
       
        name: 'Sanju',
        deviceToken: ''
      },
      {
        id: 2,
        username: 'zabi',
        password: '$2b$10$rxSqBUWnem2nKD/3QCZoiellx5zk9xRoi3Jd/TxGaB7QO.D63SXFW',
        orgpassword: 'malebennuru',
        phone: '9591748668',
        address: 'malebennuru',
        district: 'Davanagere',
        city: 'Harihara',
        state: 'Karnataka',
      
        name: 'Zabiullah',
       
      },
      {
        id: 1,
        username: 'admin',
        password: '$2b$10$.RlyPJ0ht/vSZA05bjKuoO95oKmKBiMuv6EMNVIWAvnE2hLcHzgfe',
        orgpassword: 'farmify',
        phone: '9566229075',
        address: 'Kuruva',
        district: 'India',
        city: 'Honnali',
        state: 'Karnataka',
      
        name: 'tractree',
       
      }
    ];
    console.log("deserializeUser",users)
    const user = users.find(u => u.username === id);
    console.log("deserializeUser result",user)
     done(null, user);
  });
  app.use(passport.initialize()) // init passport on every route call
  app.use(passport.session())    //allow passport to use "express-session"
  

 passport.use(new LocalStrategy(async (username, password, done) => {
       
    const users =  await adminService.getAllDealers();

    const user = users.find(u => u.username === username /*&& u.password === password*/);
    verifyPassword(password, user.password)
    .then(isMatch => {
        if (isMatch) {
            console.log("Password is correct. User authenticated successfully.");
            if (user) {
              console.log("inside local stratergy 2")
              return done(null, user);
            }
        } else {
            console.log("Password is incorrect. Authentication failed.");
            return done(null, false, { message: 'Incorrect username or password' });
        }
    })
    .catch(err => 
      {
      console.error(err)
      return done(null, false, { message: 'Incorrect username or password' });;
     
 })
 
  
  }));
  

  
  app.post('/login', (req, res, next) => {
    console.log("login",req.body)
    passport.authenticate('local',async (err, user, info) => {
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
      //const users =  await adminService.getAllDealers();
      if(req.body.token && typeof req.body.token === 'string')
        await adminService.updateDealerDeviceToken(req.body.username,req.body.token)
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
  app.patch('/dealer/markitemsold/:id', async (req, res) => {
    console.log("/dealer/markitemsold",req.params.id)
    res.send(await sellerService.markitemsold(parseInt(req.params.id)));
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
  app.get("/dealer/enquiries", async (req, res) => {
    console.log("req.session?.user.id",req.session)
    if (req.session?.user?.auntheticated ) {
      res.send(await enquiryService.getEnquiriesByDealer(req.session?.user?.id));
    } else {
    res.status(403).send('Access Denied: You are not authenticated.');
    }
  });
  app.get("/dealer/items", async (req, res) => {
    console.log("req.session?.user.id",req.session?.user?.id)
    if (req.session?.user?.auntheticated ) {
      res.send(await sellerService.getAllItemsByDealer(req.session?.user?.id));
    } else {
    res.status(403).send('Access Denied: You are not authenticated.');
    }
  });
  app.post("/enquiry", async (req, res) => {
    console.log('enquery request body', req.body);
    const ret = await enquiryService.insertEnuiry(req.body);
    console.log('return', ret);
    if(ret !== null && ret?.itemId)
    {
      const retItem = await sellerService.getDealerDevceTokenByItem(ret?.itemId);
      console.log("retItem1",retItem) 
      //console.log("retItem",retItem?.dealer?.deviceToken)
      if(retItem?.dealer?.deviceToken)
      {
        const message = {
          data: {
            type: 'enquiry', // Additional data can be added as needed
          },
          notification: {
            title:  `Enquiry for ${retItem?.name}`, // Default title for new enquiry
            body:  `Enquiry from  ${ret?.name}( ${ret?.address} & Phone no ${ret?.phone}) for item ${retItem?.name}`, // Default body for new enquiry
            imageUrl:retItem?.image_urls[0], // Image URL if applicable
          },
        };
      //const token = await adminService.getTokenByDealer('admin')
      console.log("tokennnn",retItem?.dealer?.deviceToken)
      await sendNotification(retItem?.dealer?.deviceToken, message);
      }
    }
    res.send(ret);
  });
  app.post("/dealer", async (req, res) => {
    console.log('dealer request body', req.body);
    const hashedPassword = await hashPassword(req.body.password)
    console.log("Hashed Password:", hashedPassword);
    // .then(hashedPassword => {
    //     console.log("Hashed Password:", hashedPassword);
    // })
    // .catch(err => console.error(err));
    req.body['hashedPassword'] = hashedPassword;
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
          const dealerId = dealer?dealer.id:1; //dealer default to admin
          const inputData = { ...req.body, image_urls: uploadedFiles ,dealerId};
          //console.log("inputData",inputData,dealerId)
          const ret = await sellerService.insertItem(inputData);
          console.log('return item', ret);

          if(ret !== null)
          {
            const retItem = await sellerService.getDealerDevceTokenByItem(ret?.id);
            console.log("retItem1",retItem) 
            //console.log("retItem",retItem?.dealer?.deviceToken)
            if(retItem?.dealer?.deviceToken)
            {
              const message = {
                data: {
                  type: 'Item', // Additional data can be added as needed
                },
                notification: {
                  title:  `New Item ${retItem?.name}`, // Default title for new enquiry
                  body:  `A new item has been added to your inventory  ${retItem?.name}( ${retItem?.address} & Phone no ${retItem?.phone}) `, // Default body for new enquiry
                  imageUrl:retItem?.image_urls[0], // Image URL if applicable
                },
              };
            //const token = await adminService.getTokenByDealer('admin')
            console.log("tokennnn",retItem?.dealer?.deviceToken)
            await sendNotification(retItem?.dealer?.deviceToken, message);
            }
          }

          res.send(ret);
        });
  app.get('/states', async (req, res) => {
      res.send(await statesService.getStates());
  });


  app.post("/register", (req, res) => {
    tokens.push(req.body.token);
    res.status(200).json({ message: "Successfully registered FCM Token!" });
  });
  
  app.get("/notifications", async (req, res) => {
    try {
      const { title, body, imageUrl } = req.body;
      const message = {
        data: {
          score: '850',
          time: '2:45'
        },
        notification: {
          title: 'Hello World',
          body: 'This is a test notification',
        },
      };
      const token = await adminService.getTokenByDealer('admin')
      console.log("tokennnn",token)
      await sendNotification(token, message);
      res.status(200).json({ message: "Successfully sent notifications!" });
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ message: err.message || "Something went wrong!" });
    }
  });
  const sendNotification = async (token, message) => {
    try {
      const response = await admin.messaging().sendToDevice(token, message);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.log('Error sending message:', error);
      throw error;
    }
  };
    app.get("/broadcast", async (req, res) => {
    try {
   //   const { title, body, imageUrl } = req.body;
      const message2 = {
          notification: {
            title: 'Broadcast Message',
            body: 'This is a message to all devices subscribed to the topic!',
          },
          data: {
            key1: 'value1',
            key2: 'value2'
          },
        };
        const topic = "all"; 
        const message = {
          data: {
            score: '850',
            time: '2:45'
          },
          topic: topic
        };
// Define the topic name
        //if(req.body.token)
        await adminService.updateDealerDeviceToken('admin',"req.body.token")
      admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
      res.status(200).json({ message: "Successfully sent broadcast notifications!" });
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ message: err.message || "Something went wrong!" });
    }
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
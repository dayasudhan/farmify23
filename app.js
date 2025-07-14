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
const userService = require('./server/userService')
const newTractorServices = require('./server/newTractorService')
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

  passport.deserializeUser(async (id, done) => {
    const users =  await adminService.getAllDealers();
    const user = users.find(u => u.username === id);
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
    passport.authenticate('local',(err, user, info) => {
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
      {
        console.log(" before get token" ,req.body.token)
        adminService.updateDealerDeviceToken(req.body.username,req.body.token)
        console.log(" before afterv token")
      }
      console.log( 'Dayasudhan' ,req.session);
      //res.send({status:"success",data:user})
      res.send({
        status: "success",
        data: {
          address: user.address,
          city: user.city,
          district: user.district,
          name: user.name,
          state: user.state,
          username: user.username,
          phone:user.phone,
          id:user.id
        }
      });
    })(req, res, next);
    
  }); 
  
  app.get('/logout', (req, res) => {
   
    const username = req.session?.user?.username;
    req.logout(()=>{
      adminService.updateDealerDeviceToken(username,null)
      console.log("logout inside")
    });
    res.send('logout_success');
  });
  app.get('/hello', (req, res) => res.send('Namaste Home Page'));
  app.get("/items", async (req, res) => {
    console.log("get /items")
    res.send(await sellerService.getAllItems());
  });
  app.get("/items_by_page_location", async (req, res) => {
    console.log("/items_by_page_location",req.query)
    res.send(await sellerService.getAllItems_by_page_location(req.query));
  });
  app.get("/items_by_page", async (req, res) => {
    console.log("items_by_page",req.query)
    res.send(await sellerService.getAllItems_by_page(req.query));
  });
  app.get("/itemsbysearchquery", async (req, res) => {
    console.log("itemsbysearchquery",req.query)
    res.send(await sellerService.getItemsBySearchQuery(req.query));
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
  app.get("/dealer/enquiriesbyitem", async (req, res) => {
    console.log("req.session?.user.id",req.session)
    if (req.session?.user?.auntheticated ) {
      res.send(await enquiryService.getEnquiriesByDealerGroupByItem(req.session?.user?.id));
    } else {
    res.status(403).send('Access Denied: You are not authenticated.');
    }
  });
  app.get("/user/enquiriesbyitem/:id", async (req, res) => {
      res.send(await enquiryService.getEnquiriesByItem(req.params.id));
   });
  app.get("/dealer/items", async (req, res) => {
    console.log("req.session?.user.id",req.session?.user?.id)
    if (req.session?.user?.auntheticated ) {
      res.send(await sellerService.getAllItemsByDealer(req.session?.user?.id));
    } else {
    res.status(403).send('Access Denied: You are not authenticated.');
    }
  });
  app.get("/user/items/:phone", async (req, res) => {
    console.log("req.params.phone",req.params.phone)
    res.send(await sellerService.getAllItemsByPhone(req.params.phone));
  });
  app.post("/enquiry", async (req, res) => {
    console.log('enquery request body', req.body);
    const ret = await enquiryService.insertEnuiry(req.body);
    console.log('return', ret);
    if(ret !== null && ret?.enquiry?.itemId)
    {
      

      const retItem = await sellerService.getItemByDealerDevceToken(ret?.enquiry?.itemId);
      console.log("retItem1",retItem) 
      
      //console.log("retItem",retItem?.dealer?.deviceToken)
      // if(retItem?.dealer?.deviceToken)
      // {
      //  const message = {
      //   token:retItem?.dealer?.deviceToken,
      //     data: {
      //       type: 'enquiry', // Additional data can be added as needed
      //     },
      //     notification: {
      //       title:  `Enquiry for ${retItem?.name}`, // Default title for new enquiry
      //       body:  `Name-${ret?.enquiry?.name}, Address- ${ret?.enquiry?.address},  Phone no -${ret?.enquiry?.phone}`, // Default body for new enquiry
      //       imageUrl:retItem?.image_urls[0], // Image URL if applicable
      //     },
      //   };

      // console.log("tokennnn",retItem?.dealer?.deviceToken)
      // sendNotification(retItem?.dealer?.deviceToken, message);
      // }
  //      const message = {
  //   token,
  //   notification: {
  //     title,
  //     body,
  //   },
  //   data: {
  //     type: type || '',
  //     itemId: itemId?.toString() || '',
  //   },
  // };
      const message = {
        token:ret?.deviceToken,
          data: {
            type: 'enquiry', // Additional data can be added as needed
            itemId: ret?.enquiry?.itemId?.toString() || '',
          },
          notification: {
            title:  `Enquiry for ${retItem?.name}`, // Default title for new enquiry
            body:  `Name-${ret?.enquiry?.name}, Address- ${ret?.enquiry?.address},  Phone no -${ret?.enquiry?.phone}`, // Default body for new enquiry
            imageUrl:retItem?.image_urls[0], // Image URL if applicable
          },
        };
        console.log("message",message);
       sendNotification(null,message)

    }
    res.send(ret);
  });
  app.get("/v1/advertisements", async (req, res) => {
    console.log('getadvertisements request body', req.query);
      res.send(await adminService.getAdvertisements());
  });
  app.post("/v1/advertisements", async (req, res) => {
    console.log('advertisements request body', req.body);
    const ret = await adminService.insertAdvertisement(req.body);
    console.log("ret",ret)
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
  app.get("/dealer", async (req, res) => {
    console.log("req.session?.user.id",req.session?.user?.id)
    res.send(await adminService.getDealerByUsername(req.session?.user?.id));
});
// API to update dealer settings
app.patch('/dealer/updatesettings', async (req, res) => {
  console.log("req.session?.user.id",req.session?.user?.id)
  const { allowPhoneNumberToCall, allowWhatsAppMessages } = req.body;

  console.log("Updating settings for dealer:", req.session?.user?.id, allowPhoneNumberToCall, allowWhatsAppMessages);

  try {
    const result = await adminService.updateDealerSettings(
      req.session?.user?.id,
      allowPhoneNumberToCall,
      allowWhatsAppMessages
    );
    res.status(200).send(result);
  } catch (error) {
    console.error("Error updating dealer settings:", error);
    res.status(500).send({ error: 'Failed to update dealer settings' });
  }
});

async function processAndCompressImages(req, res, next) {
  upload.array('images', 10)(req, res, async (err) => { // 'files' is the field name for multiple files
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
          console.log("processedFiles",req.processedFiles, process.env.DEV )
         
     
          const uploadedFiles = (process.env.DEV === "true") ? [
            'https://farmifyequipments.s3.amazonaws.com/Bhoomi-965371008-1725374152940.jpg'
          ]: await Promise.all(
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
                  return null;
                }
              })
          );

          // Log the uploaded file locations
          console.log('Uploaded file locations:', uploadedFiles);
          if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
          }
          
          let dealerId = 1;
          if (req.body.dealerId && !isNaN(Number(req.body.dealerId))) 
          {
            dealerId = parseInt(req.body.dealerId);
          }
          //commented for while users uploaded will be put into admin
          // else{
          //   const dealer  = await adminService.getDealerByDistrict(req.body.district);
          //   dealerId = dealer?dealer.id:1; //dealer default to admin
          // }
          const inputData = { ...req.body, image_urls: uploadedFiles ,dealerId};
          try{
          const ret = await sellerService.insertItem(inputData);
          console.log('return item', ret);

          if(ret !== null)
          {
            const retItem = await sellerService.getItemByDealerDevceToken(ret?.id);
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
            sendNotification(retItem?.dealer?.deviceToken, message);
            }
          }

          res.send(ret);
        }
        catch(err) {
          console.log("err",err)
          res
            .status(err.status || 500)
            .json({ message: err.message || "Internal server Error!" });
        }
        });
  app.post('/dealer/item', async (req, res) => {
    console.log("/dealer/item  update",req.body)
    res.send(await sellerService.updateItem(req.body));
  });

  app.get('/states', async (req, res) => {
      res.send(await statesService.getStates());
  });
  app.get('/v1/newtractors', async (req, res) => {
    res.send(await newTractorServices.getTractors());
  });
  app.get('/v1/users', async (req, res) => {
    res.send(await userService.getAllUsers());
  });
  app.get('/v1/user/:id', async (req, res) => {
    res.send(await userService.getUserByPhone(req.params.id));
  });

  app.post('/v1/user', async (req, res) => {
    console.log('user request body', req.body);
   // const hashedPassword = await hashPassword(req.body.password)
  //  console.log("Hashed Password:", hashedPassword);
    // .then(hashedPassword => {
    //     console.log("Hashed Password:", hashedPassword);
    // })
    // .catch(err => console.error(err));
   // req.body['hashedPassword'] = hashedPassword;
    const ret = await userService.insertUser(req.body);
    console.log('return', ret);
    res.send(ret);
  });

  app.post('/v1/user/devicetoken', async (req, res) => {
  try {
    const { phone, deviceToken } = req.body;
    if (!phone || !deviceToken) {
      return res.status(400).send({ message: 'Missing phoneNumber or deviceToken' });
    }

    const ret = await userService.updateDeviceToken(phone, deviceToken);
    console.log('Device token update result:', ret);
    res.send({ success: true, updated: ret });
  } catch (err) {
    console.error('Error updating device token:', err);
    res.status(500).send({ success: false, error: 'Internal Server Error' });
  }
});

  app.post('/v1/user/languagepreference', async (req, res) => {
  try {
    const { phone, languagePreference } = req.body;
    if (!phone || !languagePreference) {
      return res.status(400).send({ message: 'Missing phoneNumber or languagePreference' });
    }

    const ret = await userService.updateLanguagePreference(phone, languagePreference);
    console.log('languagePreference update result:', ret);
    res.send({ success: true, updated: ret });
  } catch (err) {
    console.error('Error updating languagePreference:', err);
    res.status(500).send({ success: false, error: 'Internal Server Error' });
  }
});

  app.post('/v1/generateotp', async(req, res) => {
    res.send(await userService.sendOtp(req.body));
  });
  app.post('/v1/verifyotp', async (req, res) => {
    
    const ret = await userService.matchOtp(req, res);
 
    // Assuming `ret` is an object like { status: 200, success: true, message: "OTP verified" }
    res.send(ret);
  });
app.post('/v1/itemnotification', async (req, res) => {
  const { title, body, type, itemId, token } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: 'Missing required fields: token, title, body' });
  }
console.log("itemnotification",req.body)
  const message = {
    token,
    notification: {
      title,
      body,
    },
    data: {
      type: type || '',
      itemId: itemId?.toString() || '',
    },
  };

  await sendNotification(null,message)
  res.send("success")
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
  const sendNotification = async (token=null, message) => {
    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.log('Error sending message:', error);
      throw error;
    }
  };
  app.get("/broadcast", async (req, res) => {
    const message = {
      notification: {
        title: "Deepavali",
        body: "Happy Deepavali",
      },
      topic: 'all',
    };
  
    try {
      const response = await admin.messaging().send(message);
      console.log(`Successfully sent message to topic:`, response);
      // Capture success in Sentry if using it
     
    } catch (error) {
      console.log('Error sending message to topic:', error);
      // Capture error in Sentry if using it
  
    }
    res.send("success");
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
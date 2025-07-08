const { PrismaClient } = require("@prisma/client");

class UserService {

  constructor() 
  {
    this.db = new PrismaClient()
  }
  async getAllUsers() {
    const result = await this.db.user.findMany({});
    return result.reverse();
  }
  
  async getUser(id) {
    const result = await this.db.user.findUnique({
      where: {
        id,
      }
    });
    //console.log('result', result);
    return result;
  }
  async getUserByPhone(phone) {
    try {
      const result = await this.db.user.findUnique({
        where: {
          phone,
        }
      });
  
      if (!result) {
        return {
          statusCode: 404,
          success: false,
          message: "User not found with this phone number.",
          data: null
        };
      }
  
      return {
        statusCode: 200,
        success: true,
        message: "User fetched successfully.",
        data: result
      };
    } catch (error) {
      console.error("Error in getUserByPhone:", error);
      return {
        statusCode: 500,
        success: false,
        message: "Internal server error.",
        data: null
      };
    }
  }
  
async updateDeviceToken(phone,deviceToken) {
    console.log("updateDeviceToken",phone,deviceToken)
    const result = await this.db.user.update({
      where: {
        phone:phone
      },
      data: {
        deviceToken: deviceToken,
        updatedAt:new Date(),
      },
    });
    console.log('result', result);
    return result;
}

async updateLanguagePreference(phone,languagePreference) {
    console.log("updateLanguagePreference",phone,languagePreference)
    const result = await this.db.user.update({
      where: {
        phone:phone
      },
      data: {
        languagePreference: languagePreference,
        updatedAt:new Date(),
      },
    });
    console.log('result', result);
    return result;
}

async insertUser(data) {
  console.log("insertUser data", data);

  try {
    const item = await this.db.user.upsert({
      where: { phone: data.phone }, // unique identifier
      update: {
        name: data.name,
        updatedAt: new Date(),
        city: data.city,
        district: data.district,
        state: data.state,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        languagePreference:data.languagePreference,
      },
      create: {
        name: data.name,
        phone: data.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
        city: data.city,
        district: data.district,
        state: data.state,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        languagePreference:data.languagePreference,
      }
    });

    return {
      success: true,
      data: item
    };
  } catch (e) {
    console.error("Error in upsertUser:", e);
    return {
      success: false,
      message: "Failed to insert or update user",
      error: e.message
    };
  }
}



  async generateOTPWithExpiry(){
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now
    return { otp, expiresAt };
  };
  async sendOtp(data) {
    console.log("data",data)
    const otp = this.generateOTPWithExpiry();
    console.log("Your OTP and expireAt is:", otp);
    return otp;
  }
  async matchOtp(req, res) {
    console.log("Input:", req.body);
    
    const { otp: inputOTP } = req.body;
  
    // Simulated stored OTP and expiry - In real app, fetch from DB or session
    let otpStore = {
      otp: "123456", // Dummy OTP for testing
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes from now
    };
  
    if (!otpStore.otp || !otpStore.expiresAt) {
      return ({
        status :400,
        success: false,
        message: "OTP not generated yet",
      });
    }
  
    if (Date.now() > otpStore.expiresAt) {
      return ({
        status :401,
        success: false,
        message: "OTP expired",
      });
    }
  
    if (inputOTP === otpStore.otp) {
      otpStore = { otp: null, expiresAt: null }; // Clear OTP after success
      return ({
        status :200,
        success: true,
        message: "OTP verified successfully",
      });
    }
  
    return ({
      status :400,
      success: false,
      message: "Invalid OTP",
    });
  }
}
module.exports = new UserService();
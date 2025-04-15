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
  

  async  insertUser(data) {
     console.log("insertUser data",data)
    try{
    const item = await this.db.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        createdAt:new Date(),
        updatedAt:new Date(), 
        city: data.city,
        district:data.district,
        state:data.state,
        latitude:parseFloat(data.location.latitude),
        longitude:parseFloat(data.location.longitude)
      },
    });
    return item;
  }
  catch(e)
  {
    return e;
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
  async matchOtp(data) {
    const { otp: inputOTP } = data;
    let otpStore = {
      otp: null,
      expiresAt: null,
    };
    if (!otpStore.otp || !otpStore.expiresAt) {
      return res.status(400).json({ success: false, message: "No OTP generated" });
    }
  
    if (Date.now() > otpStore.expiresAt) {
      otpStore = { otp: null, expiresAt: null };
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
  
    if (inputOTP === otpStore.otp) {
      otpStore = { otp: null, expiresAt: null }; // Clear after success
      return res.json({ success: true, message: "OTP verified successfully" });
    }
  
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
}
module.exports = new UserService();
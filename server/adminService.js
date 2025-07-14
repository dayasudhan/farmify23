const { PrismaClient } = require("@prisma/client");

class AdminService {

  constructor() 
  {
    this.db = new PrismaClient()
  }
  async getAllDealers() {
    const result = await this.db.dealer.findMany({});
    //console.log('result', result);
    return result;
  }
  async getDealerByDistrict(district) {
    const result = await this.db.dealer.findMany({
      where: {
        district:district
      },
    });
    //console.log('result', result);
    return result[0];
  }
  async  insertDealer(data) {
    console.log("insertDealer data",data)
    try{
    const dealer = await this.db.dealer.create({
      data: {
        username: data.username,
        phone: data.phone,
        password: data.hashedPassword,
        orgpassword: data.password,
        createdAt:new Date(),
        updatedAt:new Date(),
        address:data.address,
        district:data.district,
        state:data.state,
        city: data.city,
        name: data.name
      },
    });
    return dealer;
  }
  catch(e)
  {
    return e;
  }
  }
  async updateDealerDeviceToken(username,token) {
    console.log("updateDealerDeviceToken",username,token)
    const result = await this.db.dealer.update({
      where: {
        username
      },
      data: {
        deviceToken: token,
        updatedAt:new Date(),
      },
    });
    console.log('result', result);
    return result;
  }
  async updateDealerSettings(id, allowPhoneNumberToCall, allowWhatsAppMessages) {
    console.log("updateDealerSettings", id, allowPhoneNumberToCall, allowWhatsAppMessages);
  
    try {
      const result = await this.db.dealer.update({
        where: {
          id,
        },
        data: {
          allowPhoneNumberToCall: allowPhoneNumberToCall,
          allowWhatsAppMessages: allowWhatsAppMessages,
          updatedAt: new Date(),  // Update the timestamp
        },
      });
  
      console.log('result', result);
      return result;
    } catch (error) {
      console.error('Error updating dealer settings:', error);
      throw error;
    }
  }
  
  async getTokenByDealer(username) {
    const result = await this.db.dealer.findMany({
      where: {
        username
      },
    });
    console.log("getTokenByDealer",result);
    return result[0].deviceToken;
  }
  async getDealerByUsername(id) {
    const result = await this.db.dealer.findMany({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        allowPhoneNumberToCall: true,
        allowWhatsAppMessages: true,
        name:true,
        username:true,
      },
    });
    console.log("getTokenByDealer",result);
    return result[0];
  }
async getAdvertisements(){
      const ads = await this.db.advertisement.findMany({
      where: {
        active: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
      include: { item: true },
    });
    return ads;
  }



async  insertAdvertisement(data) {
    console.log("insertAdvertisement data",data)
    const item = this.db.advertisement.create({
      data: {
      title: data.title,
      itemId: data.itemId,
      linkUrl: data.linkUrl,
      media: data.media,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      active: data.active ?? true,
      },
    });
    return item;
  }
}
module.exports = new AdminService();
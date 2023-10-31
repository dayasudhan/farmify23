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
        password: data.password,
        createdAt:new Date(),
        updatedAt:new Date(),
        address:data.address,
        district:data.district,
        state:data.state,
        city: data.city
      },
    });
    return dealer;
  }
  catch(e)
  {
    return e;
  }
  }
}
module.exports = new AdminService();
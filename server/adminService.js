const { PrismaClient } = require("@prisma/client");

class AdminService {

  constructor() 
  {
    this.db = new PrismaClient()
  }
  async getAllDealers() {
    const result = await this.db.dealer.findMany({});
    console.log('result', result);
    return result;
  }
  async getDealer(id) {
    const result = await this.db.dealer.findUnique({
      where: {
        id,
      },
    });
    console.log('result', result);
    return result;
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
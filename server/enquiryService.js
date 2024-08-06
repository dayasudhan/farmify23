const { PrismaClient } = require("@prisma/client");

class EnquiryService {

  constructor(
   
  ) {
    this.db = new PrismaClient()
  }
  async getAllEnquiries() {
    const result = await this.db.enquiry.findMany({
      include:{
        item:true
      }
    });
    // console.log('result', result);
    return result;
  }
  async getEnquiriesByDealer(dealerId) {
    const result = await this.db.enquiry.findMany({
      where: {
        item: {
          dealerId: dealerId,
          availability:true,
        },
      },
      include:{
        item:true
      },
      orderBy: {
        id: 'desc', // Order the items by ID in descending order
      },
    });
    console.log("Result equiries",result)
    return result;
  }
  async getEnquiry(id) {
    const result = await this.db.enquiry.findUnique({
      where: {
        id,
      },
    });
    // console.log('result', result);
    return result;
  }
  async  insertEnuiry(data) {
    console.log("insertItem data",data)
    const item = await this.db.enquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email:"",
        createdAt:new Date(),
        updatedAt:new Date(),
        itemId: parseInt(data.itemId),
        address:data.address,
        city:data.city,
        state:data.state,
        zipCode:data.zipcode
      },
    });
    return item;
  }
}
module.exports = new EnquiryService();
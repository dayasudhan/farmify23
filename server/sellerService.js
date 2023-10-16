const { PrismaClient } = require("@prisma/client");

class SellerService {

  constructor() 
  {
    this.db = new PrismaClient()
  }
  async getAllItems() {
    const result = await this.db.item.findMany({});
    console.log('result', result);
    return result;
  }
  async getItem(id) {
    const result = await this.db.item.findUnique({
      where: {
        id,
      },
    });
    console.log('result', result);
    return result;
  }
  async  insertItem(data) {
    console.log("insertItem data",data)
    try{
    const item = await this.db.item.create({
      data: {
        name: data.item_name,
        phone: data.phone,
        makeYear: data.item_year,
        image_urls:data.image_urls,
        createdAt:new Date(),
        updatedAt:new Date(),
        price: parseInt(data.item_price),
        availability: true,
        description: data.description,
        address1:data.address,
        address2: data.item_place,
        city: data.city,
        state: 'Karnataka',
        zipCode: 577230,
        registrationYear: null,
        hoursDriven: null,
        no_of_owners: null,
        vehicleNo: null,
        insurance_validity: null
        // Other fields from your User model
      },
    });
    return item;
  }
  catch(e)
  {
    return e;
  }
  }
}
module.exports = new SellerService();
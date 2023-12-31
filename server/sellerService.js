const { PrismaClient } = require("@prisma/client");

class SellerService {

  constructor() 
  {
    this.db = new PrismaClient()
  }
  async getAllItems() {
    const result = await this.db.item.findMany({});
    // console.log('result', result);
    return result.reverse();
  }
  async getAllItems_by_page(page, pageSize) {
    try {
      const skip = (page - 1) * pageSize; // Calculate the number of records to skip
      const take = parseInt(pageSize); // Define the number of records to retrieve per page
  
      const result = await this.db.item.findMany({
        skip: skip, // Skip the specified number of records
        take: take, // Retrieve the specified number of records
        orderBy: {
          id: 'desc', // Order the items by ID in descending order
        },
      });
  
      // console.log('result', result);
      return result
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
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
        address:data.address,
        city: data.city,
        state: data.state,
        district:data.district,
        zipCode: 577230,
        registrationYear: null,
        hoursDriven: null,
        no_of_owners: null,
        vehicleNo: null,
        insurance_validity: null,
        dealerId:data.dealerId
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
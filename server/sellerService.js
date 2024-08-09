const { PrismaClient } = require("@prisma/client");

class SellerService {

  constructor() 
  {
    this.db = new PrismaClient()
  }
  async getAllItems() {
    const result = await this.db.item.findMany({
      where:{
        availability:true
      },
    });
    console.log('result', result[81]);
    return result.reverse();
  }
  async getAllItemsByDealer(dealerId) {
    const result = await this.db.item.findMany({
      where: {
          dealerId: dealerId,
          availability:true
      },
      orderBy: {
        id: 'desc', // Order the items by ID in descending order
      },
    });
    //console.log("Result getAllItemsByDealer",result)
    return result.reverse();
  }

  async getAllItems_by_page(page, pageSize) {
    try {
      const skip = (page - 1) * pageSize; // Calculate the number of records to skip
      const take = parseInt(pageSize); // Define the number of records to retrieve per page
  
      const result = await this.db.item.findMany({
        skip: skip, // Skip the specified number of records
        take: take, // Retrieve the specified number of records
        where:{
          availability:true
        },
        orderBy: {
          id: 'desc', // Order the items by ID in descending order
        },
        include:{
          dealer:true,
        }

      });
  
      console.log('result', result.map(e=>e.id));
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
      include:{
        dealer:{
          select: {
            phone: true,
            username:true
          }
        }
       //dealer:true,
      }
    });
    //console.log('result', result);
    return result;
  }
  async getDealerDevceTokenByItem(id) {
    const result = await this.db.item.findUnique({
      where: {
        id,
      },
      include:{
        dealer:{
          select: {
            deviceToken: true,
          }
        }
      }
    });
    return result;
  }
  async markitemsold(id) {
    const result = await this.db.item.update({
      where: {
        id,
      },
      data: {
        availability: false,
      },
    });
    //console.log('result', result);
    return result;
  }
  async  insertItem(data) {
    // console.log("insertItem data",data)
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
        seller_name:data.name,
        address:data.address,
        city: data.city,
        state: data.state,
        district:data.district,
        latitude:parseFloat(data.latitude),
        longitude:parseFloat(data.longitude),
        zipCode: parseInt(data.postcode),
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
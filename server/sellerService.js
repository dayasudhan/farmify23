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
    //onsole.log("Result getAllItemsByDealer",result)
    return result;
  }

   calculateDistance(lat1, lon1, lat2, lon2){
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }



  async getAllItems_by_page_location(arg) {
    const inputLatitude = 14.1428661;
    const inputLongitude = 75.6667316;
    const {page,pageSize} = arg;
    console.log("Arg",arg)
    // const page =2;
    // const pageSize =1;
    try {
        const result = await this.db.item.findMany({
        where:{
          availability:true
        },

        include:{
          dealer:true,
        }

      });
       const filteredCoords = result.map(e => {
       const distance = this.calculateDistance(
          parseFloat(inputLatitude),
          parseFloat(inputLongitude),
          e.latitude,
          e.longitude
        );
        return {
          ...e,
          distance: distance,
          dealer: {
            name: e.dealer.name,
            username: e.dealer.username,
            phone: e.dealer.phone,
            district: e.dealer.district
          }
        };
      }).sort((a,b)=>  a.distance - b.distance);
 
      // Apply pagination after filtering
    const startIndex = (page - 1) * pageSize;
    const paginatedResults = filteredCoords.slice(startIndex, startIndex + pageSize);

    return paginatedResults;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }
  async getAllItems_by_page(arg) {
    const {page,pageSize} = arg;
    console.log("Arg",arg)
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
  async getItemByDealerDevceToken(id) {
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
        dealerId:parseInt(data.dealerId)
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
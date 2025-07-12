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
    //console.log("Result equiries",result)
    return result;
  }
    async getEnquiriesByItem(id) {
      console.log("itemId",id);
    const result = await this.db.enquiry.findMany({
      where: {
        itemId:parseInt(id)
      },
      orderBy: {
        id: 'desc', // Order the items by ID in descending order
      },
    });
   // console.log("Result equiries",result)
    return result;
  }
  async getEnquiriesByDealerGroupByItem2(dealerId) {
    const result = await this.db.enquiry.findMany({
      where: {
        item: {
          dealerId: dealerId,
          availability: true,
        },
      },
      include: {
        item: true
      },
      orderBy: {
        id: 'desc', // Order the enquiries by ID in descending order
      },
    });
  
    // Group the enquiries by itemId
    const groupedByItemId = result.reduce((acc, enquiry) => {
      const itemId = enquiry.item.id;
      if (!acc[itemId]) {
        acc[itemId] = [];
      }
      acc[itemId].push(enquiry);
      return acc;
    }, {});
  
    return groupedByItemId;
  }
  async getEnquiriesByDealerGroupByItem(dealerId) {
    // Fetch all items for the dealer that have availability
    const items = await this.db.item.findMany({
      where: {
        dealerId: dealerId,
        availability: true,
      },
    });
  
    // Get the item IDs
    const itemIds = items.map(item => item.id);
  
    // Fetch all enquiries related to the items
    const enquiries = await this.db.enquiry.findMany({
      where: {
        itemId: {
          in: itemIds,
        },
      },
      orderBy: {
        id: 'desc', // Order enquiries by ID in descending order (most recent first)
      },
    });
  
    // Group the enquiries by itemId
    const groupedByItemId = enquiries.reduce((acc, enquiry) => {
      const itemId = enquiry.itemId;
      if (!acc[itemId]) {
        acc[itemId] = [];
      }
      acc[itemId].push(enquiry);
      return acc;
    }, {});
  
    // Filter out items that have no enquiries and sort by the most recent enquiry date
    const result = items
      .filter(item => groupedByItemId[item.id]) // Only include items that have enquiries
      .map(item => ({
        item,
        enquiries: groupedByItemId[item.id],
        mostRecentEnquiryDate: groupedByItemId[item.id][0]?.createdAt, // Get the date of the most recent enquiry
      }))
      .sort((a, b) => new Date(b.mostRecentEnquiryDate) - new Date(a.mostRecentEnquiryDate)); // Sort by most recent enquiry date
  
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
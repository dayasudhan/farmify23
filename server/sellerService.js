const { PrismaClient } = require("@prisma/client");
const statesService = require('./statesService')
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
  async getAllItemsByDealer(dealerId, paginationParams = {}) {
    const { page = 1, limit = 50, ...otherParams } = paginationParams;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalCount = await this.db.item.count({
      where: {
        dealerId: dealerId,
        availability: true
      },
    });

    const result = await this.db.item.findMany({
      where: {
          dealerId: dealerId,
          availability: true
      },
      orderBy: {
        id: 'desc', // Order the items by ID in descending order
      },
      skip: skip,
      take: limit,
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    //onsole.log("Result getAllItemsByDealer",result)
    
    return {
      data: result,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalCount: totalCount,
        limit: limit,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
      }
    };
  }
  async getAllItemsByPhone(phone) {
    const result = await this.db.item.findMany({
      where: {
        phone: phone,
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
    const inputLatitude = arg.latitude;
    const inputLongitude = arg.longitude;
    const {page,pageSize,searchText} = arg;

    console.log("Arg",arg,inputLatitude,inputLongitude)
    if (!inputLatitude || !inputLongitude) {
        return this.getItemsBySearchQuery({ page, pageSize, searchText });
      }

    try {
        const searchCondition = searchText
        ? {
            OR: [
               { model: { contains: searchText, mode: "insensitive" } },
               { name: { contains: searchText, mode: "insensitive" } },
               { makeYear: { contains: searchText, mode: "insensitive" } },
               { district: { contains: searchText, mode: "insensitive" } },
            ]
          }
        : {};
        const result = await this.db.item.findMany({
        where:{
          availability:true,
          ...searchCondition
        },

        include:{
          dealer:true,
        }

      });
      
      const filteredCoords = result.map(e => {
  const hasCoords = e.latitude != null && e.longitude != null;

  const distance = hasCoords
    ? this.calculateDistance(
        parseFloat(inputLatitude),
        parseFloat(inputLongitude),
        e.latitude,
        e.longitude
      )
    : null;

  return {
    ...e,
    distance: hasCoords ? Math.round(distance) : null,
    dealer: {
      id: e.dealer.id,
      name: e.dealer.name,
      username: e.dealer.username,
      phone: e.dealer.phone,
      district: e.dealer.district,
      city: e.dealer.city,
      address: e.dealer.address,
      state: e.dealer.state,
      allowPhoneNumberToCall: e.dealer.allowPhoneNumberToCall
    }
  };
});

// Split into two groups
const withDistance = filteredCoords.filter(item => item.distance !== null);
const withoutDistance = filteredCoords.filter(item => item.distance === null);

// Sort separately
withDistance.sort((a, b) => a.distance - b.distance); // nearest first
withoutDistance.sort((a, b) => b.id - a.id);          // latest first

// Merge back
const sortedResults = [...withDistance, ...withoutDistance];
 
      // Apply pagination after filtering
    const startIndex = (page - 1) * pageSize;
    const paginatedResults = sortedResults.slice(startIndex, startIndex + pageSize);

    const updatedResult = paginatedResults.map(item => ({
      ...item,
      contact_phone: item.dealer?.id === 1 
          ? item.phone  // If dealer ID is 1, use the item's phone
          : (item.dealer?.phone || item.phone) // Otherwise, use dealer's phone if available, else item's phone
      }));

      //console.log('result234', updatedResult.map(e => [{"id":e.id,"distance":e.distance}]));
      // console.log("sample json 1", updatedResult[0])
      // console.log("sample json 2", updatedResult[1])
      return updatedResult;
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
          dealer: {
            select: {
                id: true,      // Include dealer ID
                name: true,    // Include dealer name
                phone: true,   // Include dealer email
                address:true,
                city:true,
                district:true,
                state:true,
                username: true,
                allowPhoneNumberToCall:true,
                // Exclude dealer password by not including it in the select statement
            }
        }}

      });
  
      // Add contact_phone to each result with the new condition
      const updatedResult = result.map(item => ({
        ...item,
        contact_phone: item.dealer?.id === 1 
            ? item.phone  // If dealer ID is 1, use the item's phone
            : (item.dealer?.phone || item.phone) // Otherwise, use dealer's phone if available, else item's phone
    }));

    console.log('result', updatedResult.map(e => e.id));
    return updatedResult;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }

  async getItemsBySearchQuery(arg) {
    console.log("getItemsBySearchQuery")
    const { page, pageSize, searchText } = arg;
    console.log("Arg", arg);
    try {
      const skip = (page - 1) * pageSize; // Calculate the number of records to skip
      const take = parseInt(pageSize); // Define the number of records to retrieve per page
  
      const searchCondition = searchText
        ? {
            OR: [
               { model: { contains: searchText, mode: "insensitive" } },
               { name: { contains: searchText, mode: "insensitive" } },
               { makeYear: { contains: searchText, mode: "insensitive" } },
               { district: { contains: searchText, mode: "insensitive" } },
            ]
          }
        : {};
  
      const result = await this.db.item.findMany({
        where: {
          availability: true,
          ...searchCondition
        },
        orderBy: {
          id: 'desc' // Order the items by ID in descending order
        },
        skip,
        take,
        include: {
          dealer: {
            select: {
              id: true,      // Include dealer ID
              name: true,    // Include dealer name
              phone: true,   // Include dealer phone
              address: true,
              city: true,
              district: true,
              state: true,
              username: true,
              allowPhoneNumberToCall: true
            }
          }
        }
      });
  
      // Add contact_phone to each result with the new condition
      const updatedResult = result.map(item => ({
        ...item,
        contact_phone: item.dealer?.id === 1 
          ? item.phone  // If dealer ID is 1, use the item's phone
          : (item.dealer?.phone || item.phone) // Otherwise, use dealer's phone if available, else item's phone
      }));
  
      console.log('result', updatedResult.map(e => e.id));
      // console.log("sample json 1", updatedResult[0])
      // console.log("sample json 2", updatedResult[1])
      return updatedResult;
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
     console.log("insertItem data",data)
     if(data.latitude == null && data.longitude == null)
     {
      const coords = await statesService.getCoordinateForDistrict(data.state,data.district)
      data.latitude = coords.latitude;
      data.longitude = coords.longitude;
      console.log("data",data.latitude,data.longitude);
     }
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
        hoursDriven: parseInt(data.hoursDriven),
        no_of_owners: parseInt(data.no_of_owners),
        vehicleNo: null,
        dealerId:parseInt(data.dealerId),
        model:data.model,
        hypothecation_status:data.hypothetical_status,
        loan_status: data.loan_status,
        loan_availability: (data.loan_availability === 'true'),
        insurance_status:(data.insurance_status === 'true'),
        rc_present:(data.rc_present === 'true'),
        fitnessCertificate:(data.fitnessCertificate  === 'true'),
        fc_approximate_cost:0,
        tailor_attached:(data.tailor_attached === 'true'),
        condition:data.tractor_condition,
        battery_condition:data.battery_condition,
        tyre_condition:data.tyre_condition,
        type:data.implement_type,
        rto:data.rto,
        implements:data.implements
        
      },
    });
    return item;
  }
  catch(e)
  {
    return e;
  }
  }

  async updateItem(data) {
    console.log("data",data)
    const result = await this.db.item.update({
      where: {
        id:parseInt(data.id)
      },
       data: {
        name: data.item_name,
        phone: data.phone,
        makeYear: data.item_year,
        //image_urls:data.image_urls,
        //createdAt:new Date(),
        updatedAt:new Date(),
        price: parseInt(data.item_price),
        availability: true,
        description: data.description,
        seller_name:data.name,
        address:data.address,
        city: data.city,
        state: data.state,
        district:data.district,
        //latitude:parseFloat(data.latitude),
        //longitude:parseFloat(data.longitude),
        zipCode: parseInt(data.postcode),
        registrationYear: null,
        hoursDriven: parseInt(data.hoursDriven),
        no_of_owners: parseInt(data.no_of_owners),
        vehicleNo: null,
        //dealerId:parseInt(data.dealerId),
        model:data.model,
        hypothecation_status:data.hypothetical_status,
        loan_status: data.loan_status,
        loan_availability: (data.loan_availability === 'true'),
        insurance_status:(data.insurance_status === 'true'),
        rc_present:(data.rc_present === 'true'),
        fitnessCertificate:(data.fitnessCertificate  === 'true'),
        fc_approximate_cost:0,
        tailor_attached:(data.tailor_attached === 'true'),
        condition:data.tractor_condition,
        battery_condition:data.battery_condition,
        tyre_condition:String(data.tyre_condition),
        type:data.implement_type,
        rto:data.rto,
        implements:data.implements
        
      },
    });
    console.log('result', result);
    return result;
  }
}
module.exports = new SellerService();
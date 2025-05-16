
class StatesService {

  constructor() 
  {
    this.states = {
        "states":['Karnataka'],
        "districts":{
        "Karnataka": ["Davanagere","Shimoga", "Bagalkote", "Ballari", "Belagavi", "Bengaluru Urban", "Bengaluru Rural",
         "Bidar", "Chamarajanagar", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", 
         "Dakshina Kannada",  "Dharwad", "Gadag", "Hassan", "Haveri", 
         "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", 
         "Ramanagara",  "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        "Andhra Pradesh": ["Hyderabad", "Vijayawada", "Visakhapatnam"]
        },

        "rto":{
          "Karnataka": [
            "None",
            "KA01(Bangalore Central)",
            "KA02(Bangalore West)",
            "KA03(Bangalore East)",
            "KA04(Bangalore North)",
            "KA05(Bangalore South)",
            "KA06(Tumkur)",
            "KA07(Kolar)",
            "KA08(K.G.F)",
            "KA09(Mysore West)",
            "KA10(Chamarajnagar)",
            "KA11(Mandya)",
            "KA12(Madikeri)",
            "KA13(Hassan)",
            "KA14(Shimoga)",
            "KA15(Sagar)",
            "KA16(Chitradurga)",
            "KA17(Davanagere)",
            "KA18(Chickmaglur)",
            "KA19(Dakshina Kannada)",
            "KA20(Udupi)",
            "KA21(Puttur)",
            "KA22(Belgaum)",
            "KA23(Chikkodi)",
            "KA24(Bailhongal)",
            "KA25(Dharwar)",
            "KA26(Gadag)",
            "KA27(Haveri)",
            "KA28(Bijapur)",
            "KA29(Bagalkot)",
            "KA30(Karwar)",
            "KA31(Sirsi)",
            "KA32(Gulbarga)",
            "KA33(Yadgir)",
            "KA34(Bellary)",
            "KA35(Hospet)",
            "KA36(Raichur)",
            "KA37(Gangavathi)",
            "KA38(Bidar)",
            "KA39(Bhalki)",
            "KA40(Chickballapur)",
            "KA41(Jnanabharathi)",
            "KA42(Ramanagar)",
            "KA43(Devanahalli)",
            "KA44(Tiptur)",
            "KA45(Hunsur)",
            "KA46(Sakaleshapur)",
            "KA47(Honnavar)",
            "KA48(Jamakhandi)",
            "KA49(Gokak)",
            "KA50(Yelhanka)",
            "KA51(Electronic City)",
            "KA52(Nelamangala)",
            "KA53(K.R.Puram)",
            "KA54(Nagamangala)",
            "KA55(Mysore East)",
            "KA56(Basavakalyana)",
            "KA57(Bangalore STU and AR)",
            "KA58(Banashankari)",
            "KA59(Chandapura)",
            "KA60(R.T.Nagar)",
            "KA61(Marathalli)",
            "KA62(Surathkal, Dakshina Kannada District)",
            "KA63(Hubli, Dharwad District)",
            "KA64(Madhugiri, Tumkur District)",
            "KA65(Dandeli, Karwar District)",
            "KA66(Tarikere, Chikkamagalore District)",
            "KA70(Bantwal)"
        ]
        },
        "coordinates":{
            "state": "Karnataka",
            "districts": [
              { "district": "Davanagere", "latitude": 14.470586, "longitude": 75.914154 },
              { "district": "Shimoga", "latitude": 13.929930, "longitude": 75.568100 },
              { "district": "Bagalkote", "latitude": 16.181700, "longitude": 75.695801 },
              { "district": "Ballari", "latitude": 15.139393, "longitude": 76.921440 },
              { "district": "Belagavi", "latitude": 15.850000, "longitude": 74.500000 },
              { "district": "Bengaluru Urban", "latitude": 12.972442, "longitude": 77.580643 },
              { "district": "Bengaluru Rural", "latitude": 13.227243, "longitude": 77.574021 },
              { "district": "Bidar", "latitude": 17.920000, "longitude": 77.519722 },
              { "district": "Chamarajanagar", "latitude": 11.926147, "longitude": 76.943733 },
              { "district": "Chikkaballapura", "latitude": 13.432515, "longitude": 77.727478 },
              { "district": "Chikkamagaluru", "latitude": 13.313000, "longitude": 75.737000 },
              { "district": "Chitradurga", "latitude": 14.230000, "longitude": 76.400002 },
              { "district": "Dakshina Kannada", "latitude": 12.870000, "longitude": 74.880000 },
              { "district": "Dharwad", "latitude": 15.460252, "longitude": 75.010284 },
              { "district": "Gadag", "latitude": 15.429800, "longitude": 75.629700 },
              { "district": "Hassan", "latitude": 13.005000, "longitude": 76.100000 },
              { "district": "Haveri", "latitude": 14.800000, "longitude": 75.400000 },
              { "district": "Kalaburagi", "latitude": 17.329731, "longitude": 76.834295 },
              { "district": "Kodagu", "latitude": 12.420000, "longitude": 75.730000 },
              { "district": "Kolar", "latitude": 13.133889, "longitude": 78.133889 },
              { "district": "Koppal", "latitude": 15.350000, "longitude": 76.150000 },
              { "district": "Mandya", "latitude": 12.520000, "longitude": 76.900000 },
              { "district": "Mysuru", "latitude": 12.295810, "longitude": 76.639381 },
              { "district": "Raichur", "latitude": 16.200000, "longitude": 77.350000 },
              { "district": "Ramanagara", "latitude": 12.720000, "longitude": 77.280000 },
              { "district": "Tumakuru", "latitude": 13.340880, "longitude": 77.101000 },
              { "district": "Udupi", "latitude": 13.340880, "longitude": 74.742142 },
              { "district": "Uttara Kannada", "latitude": 14.800000, "longitude": 74.130000 },
              { "district": "Vijayapura", "latitude": 16.830000, "longitude": 75.710000 },
              { "district": "Yadgir", "latitude": 16.770000, "longitude": 77.140000 }
            ]
          }
      };
  }
  async getStates() {
    return this.states;
  }
  async getDistricts(id) {

  }
  async getCoordinateForDistrict(state, district) {
  try {
    if (
      this.states.coordinates &&
      this.states.coordinates.state === state &&
      Array.isArray(this.states.coordinates.districts)
    ) {
      const match = this.states.coordinates.districts.find(
        (item) => item.district.toLowerCase() === district.toLowerCase()
      );
      if (match) {
        return { latitude: match.latitude, longitude: match.longitude };
      } else {
        throw new Error("District not found in coordinates list");
      }
    } else {
      throw new Error("State not found or coordinates data is missing");
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

}

module.exports = new StatesService();
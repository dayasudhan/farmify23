
class StatesService {

  constructor() 
  {
    this.states = {
        "states":['Andhra Pradesh','Karnataka','Kerala'],
        "districts":{
        "Karnataka": [
            // "Bagalkot",
            // "Ballari (Bellary)",
            // "Belagavi (Belgaum)",
            // "Bengaluru (Bangalore) Rural",
            // "Bengaluru (Bangalore) Urban",
            "Bengaluru Urban",
            // "Bidar",
            // "Chamarajanagar",
            // "Chikballapur",
            // "Chikkamagaluru (Chikmagalur)",
            // "Chitradurga",
            // "Dakshina Kannada",
            "Davanagere",
            // "Dharwad",
            // "Gadag",
            // "Hassan",
            // "Haveri",
            // "Kalaburagi (Gulbarga)",
            // "Kodagu",
            // "Kolar",
            // "Koppal",
            // "Mandya",
            // "Mysuru (Mysore)",
            // "Raichur",
            // "Ramanagara",
            "Shimoga",
            // "Tumakuru (Tumkur)",
            // "Udupi",
            // "Uttara Kannada (Karwar)",
            // "Vijayapura (Bijapur)",
            // "Yadgir"
          ],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        "Andhra Pradesh": ["Hyderabad", "Vijayawada", "Visakhapatnam"]
        }
      };
  }
  async getStates() {
    // console.log("states", this.states);
    return this.states;
  }
  async getDistricts(id) {
  }


}

module.exports = new StatesService();
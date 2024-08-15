
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
        }
      };
  }
  async getStates() {
    return this.states;
  }
  async getDistricts(id) {

  }


}

module.exports = new StatesService();
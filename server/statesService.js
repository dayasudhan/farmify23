
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

class NewTractorService {

  constructor() 
  {
    this.tractors= {
      "tractors": [
        {
          "brand": "Mahindra",
          "model": "475 DI XP PLUS",
          "engine": {
            "power_hp": 44,
            "power_kw": 31.3,
            "displacement_cc": 2979,
            "cylinders": 4,
            "rated_rpm": 2000,
            "max_torque_nm": 172,
            "air_filter": "3-stage oil bath type with pre-cleaner",
            "cooling_system": "Water-cooled"
          },
          "transmission": {
            "type": "Partial Constant Mesh",
            "clutch": "Single (standard) / Dual with RCRPTO (optional)",
            "gearbox": "8 Forward + 2 Reverse",
            "speed_range_kmph": {
              "forward": "2.9 - 29.9",
              "reverse": "4.1 - 11.9"
            }
          },
          "pto": {
            "power_hp": 39,
            "speed_rpm": 540
          },
          "hydraulics": {
            "lifting_capacity_kg": 1500,
            "3_point_linkage": "High-precision hydraulics"
          },
          "steering": {
            "type": "Dual Acting Power Steering / Manual Steering (optional)"
          },
          "brakes": {
            "type": "Oil-immersed brakes"
          },
          "dimensions_weight": {
            "wheelbase_mm": 1960,
            "length_mm": 3420,
            "width_mm": 1910,
            "ground_clearance_mm": 350,
            "total_weight_kg": 1950
          },
          "tyres": {
            "front": "6.00 x 16",
            "rear": "13.6 x 28"
          },
          "fuel_tank": {
            "capacity_liters": 55
          },
          "warranty": "6 years",
          "compatible_implements": [
            "Cultivator",
            "Rotavator",
            "Plow",
            "Seed Drill"
          ],
          "media": {
            "images": [
              "https://www.mahindratractor.com/sites/default/files/styles/958x863/public/2024-07/MAHINDRA-475-DI-XP-PLUS-desktop.webp?itok=wEAJfUGd"
            ],
            "videos": []
          },
          "fuel_type": "Diesel",
          "electric": false,
          "mini_tractor": false,
          "drive": "2WD",
          "description": "A powerful and efficient tractor from Mahindra, suitable for farming operations.",
          "about_tractor": "The Mahindra 475 DI XP PLUS is known for its robust performance and reliability in agricultural tasks.",
          "reviews": [],
          "faqs": [],
          "pros": ["Fuel-efficient", "Durable build", "High lifting capacity"],
          "cons": ["Manual steering in base variant"]
        },
        {
          "brand": "John Deere",
          "model": "5042D",
          "popular": true,
          "latest": "2025-03-30",
          "engine": {
            "power_hp": 42,
            "power_kw": 31.3,
            "displacement_cc": 2900,
            "cylinders": 3,
            "rated_rpm": 2100,
            "max_torque_nm": 160,
            "air_filter": "Dry type, dual element",
            "cooling_system": "Coolant cooled with overflow reservoir"
          },
          "transmission": {
            "type": "Collarshift Partial Constant Mesh",
            "clutch": "Single / Dual",
            "gearbox": "8 Forward + 4 Reverse",
            "speed_range_kmph": {
              "forward": "2.83 - 30.92",
              "reverse": "3.4 - 13.5"
            }
          },
          "pto": {
            "power_hp": 36,
            "speed_rpm": "540 @ 2100 ERPM, 540 @ 1600 ERPM (optional)"
          },
          "hydraulics": {
            "lifting_capacity_kg": 1600,
            "3_point_linkage": "Category-II, Automatic Depth & Draft Control (ADDC)"
          },
          "steering": {
            "type": "Power Steering"
          },
          "brakes": {
            "type": "Oil-immersed Disc Brakes"
          },
          "dimensions_weight": {
            "wheelbase_mm": 1970,
            "length_mm": 3410,
            "width_mm": 1810,
            "ground_clearance_mm": 415,
            "total_weight_kg": 1810
          },
          "tyres": {
            "front": "6.00 x 16",
            "rear": "13.6 x 28"
          },
          "fuel_tank": {
            "capacity_liters": 60
          },
          "warranty": "5 years",
          "compatible_implements": [
            "Rotavator",
            "Cultivator",
            "Harvester",
            "Plow"
          ],
          "media": {
            "images": [
              "https://example.com/images/john-deere-5042d.jpg"
            ],
            "videos": []
          },
          "fuel_type": "Diesel",
          "electric": false,
          "mini_tractor": false,
          "drive": "2WD",
          "description": "A robust and powerful tractor designed for heavy-duty farming applications.",
          "about_tractor": "John Deere 5042D is known for its durability, fuel efficiency, and superior performance in agricultural tasks.",
          "reviews": [],
          "faqs": [],
          "pros": ["Fuel-efficient", "Durable build", "Powerful engine"],
          "cons": ["Higher maintenance cost", "Basic features in base model"]
        },
        {
          "brand": "Swaraj",
          "model": "744 FE",
          "engine": {
            "power_hp": 48,
            "power_kw": 35.8,
            "displacement_cc": 3136,
            "cylinders": 3,
            "rated_rpm": 2000,
            "max_torque_nm": 205,
            "air_filter": "3-stage oil bath type",
            "cooling_system": "Water-cooled with no loss tank"
          },
          "transmission": {
            "type": "Constant Mesh",
            "clutch": "Single / Dual (Optional)",
            "gearbox": "8 Forward + 2 Reverse",
            "speed_range_kmph": {
              "forward": "2.9 - 29.2",
              "reverse": "3.4 - 11.6"
            }
          },
          "pto": {
            "power_hp": 41,
            "speed_rpm": 540
          },
          "hydraulics": {
            "lifting_capacity_kg": 1700,
            "3_point_linkage": "Automatic depth and draft control (ADDC)"
          },
          "steering": {
            "type": "Mechanical / Power Steering (Optional)"
          },
          "brakes": {
            "type": "Oil-immersed disc brakes"
          },
          "dimensions_weight": {
            "wheelbase_mm": 1950,
            "length_mm": 3440,
            "width_mm": 1730,
            "ground_clearance_mm": 400,
            "total_weight_kg": 1990
          },
          "tyres": {
            "front": "6.00 x 16",
            "rear": "13.6 x 28"
          },
          "fuel_tank": {
            "capacity_liters": 60
          },
          "warranty": "6 years",
          "compatible_implements": [
            "Rotavator",
            "Cultivator",
            "Plough",
            "Trailer"
          ],
          "media": {
            "images": [
              "https://www.swarajtractors.com/sites/default/files/2021-08/Swaraj-744-FE.png"
            ],
            "videos": []
          },
          "popular": true,
          "latest": "2024-03-30"
        },
        {
          "brand": "Kubota",
          "model": "MU4501 2WD",
          "engine": {
            "power_hp": 45,
            "power_kw": 33.5,
            "displacement_cc": 2434,
            "cylinders": 4,
            "rated_rpm": 2500,
            "max_torque_nm": 170,
            "air_filter": "Dry type, dual element",
            "cooling_system": "Liquid-cooled"
          },
          "transmission": {
            "type": "Synchromesh",
            "clutch": "Double clutch",
            "gearbox": "8 Forward + 4 Reverse",
            "speed_range_kmph": {
              "forward": "3.0 - 30.8",
              "reverse": "3.9 - 14.9"
            }
          },
          "pto": {
            "power_hp": 38,
            "speed_rpm": "540 / 750"
          },
          "hydraulics": {
            "lifting_capacity_kg": 1640,
            "3_point_linkage": "Category I & II, Hydraulic control system"
          },
          "steering": {
            "type": "Power Steering"
          },
          "brakes": {
            "type": "Oil-immersed disc brakes"
          },
          "dimensions_weight": {
            "wheelbase_mm": 1990,
            "length_mm": 3100,
            "width_mm": 1870,
            "ground_clearance_mm": 365,
            "total_weight_kg": 1950
          },
          "tyres": {
            "front": "6.00 x 16",
            "rear": "13.6 x 28"
          },
          "fuel_tank": {
            "capacity_liters": 60
          },
          "warranty": "5 years",
          "compatible_implements": [
            "Rotavator",
            "Cultivator",
            "Plough",
            "Trailer"
          ],
          "media": {
            "images": [
              "https://kubota.co.in/wp-content/uploads/2022/10/Kubota-MU4501.jpg"
            ],
            "videos": []
          },
          "fuel_type": "Diesel",
          "electric": false,
          "mini_tractor": false,
          "drive": "2WD",
          "description": "A powerful and fuel-efficient tractor with advanced features for Indian farming needs.",
          "about_tractor": "The Kubota MU4501 2WD is known for its high fuel efficiency, powerful engine, and superior performance in agricultural operations.",
          "reviews": [],
          "faqs": [],
          "pros": ["High fuel efficiency", "Smooth transmission", "Good lifting capacity"],
          "cons": ["Limited reverse speed options"]
        } ,
        {
          "brand": "Sonalika",
          "model": "Tiger Electric",
          "engine": {
            "power_hp": 35,
            "cylinders": 0,
            "rated_rpm": 0,
            "battery_capacity_kwh": 25.5,
            "charging_time_hours": 4,
            "max_torque_nm": 120,
            "cooling_system": "Liquid-cooled"
          },
          "transmission": {
            "type": "Automatic",
            "gearbox": "Direct Drive"
          },
          "pto": {
            "speed_rpm": 540
          },
          "hydraulics": {
            "lifting_capacity_kg": 500,
            "3_point_linkage": "Automatic depth and draft control (ADDC)"
          },
          "steering": {
            "type": "Power Steering"
          },
          "brakes": {
            "type": "Oil-immersed disc brakes"
          },
          "dimensions_weight": {
            "wheelbase_mm": 1420,
            "length_mm": 2765,
            "width_mm": 900,
            "ground_clearance_mm": 300,
            "total_weight_kg": 820
          },
          "tyres": {
            "front": "5.00 x 12",
            "rear": "8.00 x 18"
          },
          "fuel_tank": {
            "capacity_liters": 0
          },
          "warranty": "5 years",
          "compatible_implements": [
            "Rotavator",
            "Cultivator",
            "Sprayer"
          ],
          "media": {
            "images": [
              "https://www.sonalika.com/images/tiger-electric.png"
            ],
            "videos": []
          },
          "fuel_type": "Electric",
          "electric": true,
          "mini_tractor": false,
          "drive": "2WD",
          "description": "India’s first electric tractor, offering eco-friendly and cost-effective farming solutions.",
          "about_tractor": "Sonalika Tiger Electric is a revolutionary electric tractor designed for sustainable and efficient farming. It provides noiseless operation, zero emissions, and reduced operational costs.",
          "reviews": [],
          "faqs": [],
          "pros": ["Eco-friendly", "Low maintenance", "Quick charging"],
          "cons": ["Lower lifting capacity compared to diesel tractors"]
        },
        {
          "brand": "Swaraj",
          "model": "717",
          "engine": {
            "power_hp": 15,
            "cylinders": 1,
            "rated_rpm": 2300,
            "displacement_cc": 863.5,
            "cooling_system": "Water-cooled"
          },
          "transmission": {
            "type": "Sliding Mesh",
            "gearbox": "6 Forward + 3 Reverse",
            "clutch": "Single dry friction plate",
            "speed_range_kmph": {
              "forward": "2.02 - 25.62",
              "reverse": "2.40 - 10.96"
            }
          },
          "pto": {
            "power_hp": 9,
            "speed_rpm": 540
          },
          "hydraulics": {
            "lifting_capacity_kg": 780,
            "3_point_linkage": "Automatic depth and draft control (ADDC)"
          },
          "steering": {
            "type": "Mechanical Steering"
          },
          "brakes": {
            "type": "Dry disc brakes"
          },
          "dimensions_weight": {
            "wheelbase_mm": 1490,
            "length_mm": 2435,
            "width_mm": 980,
            "ground_clearance_mm": 260,
            "total_weight_kg": 850
          },
          "tyres": {
            "front": "5.20 x 14",
            "rear": "8.00 x 18"
          },
          "fuel_tank": {
            "capacity_liters": 19
          },
          "warranty": "2 years",
          "compatible_implements": [
            "Rotavator",
            "Seed Drill",
            "Sprayer"
          ],
          "media": {
            "images": [
              "https://www.swarajtractors.com/sites/default/files/2021-08/Swaraj-717.png"
            ],
            "videos": []
          },
          "fuel_type": "Diesel",
          "electric": false,
          "mini_tractor": true,
          "drive": "2WD",
          "description": "A compact and fuel-efficient mini tractor suitable for small-scale farming operations.",
          "about_tractor": "Swaraj 717 is a small yet powerful mini tractor designed for light agricultural work, offering high fuel efficiency and maneuverability.",
          "reviews": [],
          "faqs": [],
          "pros": ["Compact size", "Fuel-efficient", "Ideal for small farms"],
          "cons": ["Lower power output", "Basic features"]
        },
        
               
      ]
    }     
  }
  async getTractors() {
    return this.tractors.tractors;
  }

}

module.exports = new NewTractorService();
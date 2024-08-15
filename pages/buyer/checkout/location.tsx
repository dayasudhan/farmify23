import React, { useState } from 'react';

function calculateDistance(lat1, lon1, lat2, lon2) {
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

function FilterCoordinatesWithinRadius() {
  const [inputLatitude, setInputLatitude] = useState('14.1431');
  const [inputLongitude, setInputLongitude] = useState('75.6652');
  const [filteredCoordinates, setFilteredCoordinates] = useState([]);
  const [radius] = useState(200); // Radius in kilometers
  const [inputradius, setInputradius] = useState('100');
  const coordinatesArray = [
    {
      "name": "Bagalkot",
      "latitude": 16.1794,
      "longitude": 75.6961
    },
    {
      "name": "Ballari (Bellary)",
      "latitude": 15.1406,
      "longitude": 76.9214
    },
    {
      "name": "Belagavi",
      "latitude": 15.8497,
      "longitude": 74.4977
    },
    {
      "name": "Bengaluru Rural",
      "latitude": 13.2904,
      "longitude": 77.7987
    },
    {
      "name": "Bengaluru Urban",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    {
      "name": "Bidar",
      "latitude": 17.9135,
      "longitude": 77.5183
    },
    {
      "name": "Chamarajanagar",
      "latitude": 11.9237,
      "longitude": 76.9476
    },
    {
      "name": "Chikkaballapura",
      "latitude": 13.4355,
      "longitude": 77.7319
    },
    {
      "name": "Chikmagalur",
      "latitude": 13.3153,
      "longitude": 75.7754
    },
    {
      "name": "Chitradurga",
      "latitude": 14.2231,
      "longitude": 76.4003
    },
    {
      "name": "Dakshina Kannada",
      "latitude": 12.9141,
      "longitude": 74.8560
    },
    {
      "name": "Davanagere",
      "latitude": 14.4641,
      "longitude": 75.9219
    },
    {
      "name": "Dharwad",
      "latitude": 15.4551,
      "longitude": 75.0068
    },
    {
      "name": "Gadag",
      "latitude": 15.4249,
      "longitude": 75.6377
    },
    {
      "name": "Hassan",
      "latitude": 13.0072,
      "longitude": 76.1020
    },
    {
      "name": "Haveri",
      "latitude": 14.7957,
      "longitude": 75.6912
    },
    {
      "name": "Kalaburagi (Gulbarga)",
      "latitude": 17.3291,
      "longitude": 76.8343
    },
    {
      "name": "Kodagu (Coorg)",
      "latitude": 12.3375,
      "longitude": 75.8068
    },
    {
      "name": "Kolar",
      "latitude": 13.1366,
      "longitude": 78.1290
    },
    {
      "name": "Koppal",
      "latitude": 15.3556,
      "longitude": 76.1549
    },
    {
      "name": "Mandya",
      "latitude": 12.5249,
      "longitude": 76.8954
    },
    {
      "name": "Mysuru",
      "latitude": 12.2958,
      "longitude": 76.6394
    },
    {
      "name": "Raichur",
      "latitude": 16.2140,
      "longitude": 77.3435
    },
    {
      "name": "Ramanagara",
      "latitude": 12.7204,
      "longitude": 77.2748
    },
    {
      "name": "Shivamogga (Shimoga)",
      "latitude": 13.9316,
      "longitude": 75.5673
    },
    {
      "name": "Tumakuru (Tumkur)",
      "latitude": 13.3409,
      "longitude": 77.1000
    },
    {
      "name": "Udupi",
      "latitude": 13.3409,
      "longitude": 74.7421
    },
    {
      "name": "Uttara Kannada (Karwar)",
      "latitude": 14.6349,
      "longitude": 74.7538
    },
    {
      "name": "Vijayapura (Bijapur)",
      "latitude": 16.8302,
      "longitude": 75.7100
    },
    {
      "name": "Yadgir",
      "latitude": 16.7687,
      "longitude": 77.1386
    }
  ];
  const handleLatitudeChange = (e) => {
    setInputLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setInputLongitude(e.target.value);
  };
  const handleInputRadiusChange = (e) => {
    setInputradius(e.target.value);
  };

  const filterCoordinates = () => {
    if (!inputLatitude || !inputLongitude || !inputradius) {
      alert('Please enter valid latitude and longitude.');
      return;
    }

    // const filteredCoords = coordinatesArray.filter(({ latitude, longitude }) => {
    //   const distance = calculateDistance(
    //     parseFloat(inputLatitude),
    //     parseFloat(inputLongitude),
    //     latitude,
    //     longitude
    //   );
    //   return distance <= parseInt(inputradius);
    // });

    const filteredCoords = coordinatesArray.map(e => {
          const distance = calculateDistance(
            parseFloat(inputLatitude),
            parseFloat(inputLongitude),
            e.latitude,
            e.longitude
          );
          return {...e,distance:distance}
        }).sort((a,b)=>  a.distance - b.distance);
    setFilteredCoordinates(filteredCoords);
  };

  return (
    <div>
      <h2>Filter Coordinates Within Radius</h2>
      <div>
        <label>Latitude:</label>
        <input type="text" value={inputLatitude} onChange={handleLatitudeChange} />
      </div>
      <div>
        <label>Longitude:</label>
        <input type="text" value={inputLongitude} onChange={handleLongitudeChange} />
      </div>
      <div>
        <label>Distance:</label>
        <input type="text" value={inputradius} onChange={handleInputRadiusChange} />
      </div>
      <button onClick={filterCoordinates}>Filter Coordinates</button>

      <h2>Filtered Coordinates:</h2>
      <ul>
        {filteredCoordinates.map((coord, index) => (
          <li key={index}>
            name: {coord.name}  ,distance: {coord.distance}  
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterCoordinatesWithinRadius;
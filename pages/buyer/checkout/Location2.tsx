import React, { useState } from 'react';

const fetchDistrictFromCoordinates = (latitude, longitude) => {
  const apiKey = '04a5800be4bb465bb63d271f5b3941e4';
  const geocodingApiEndpoint = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

  return fetch(geocodingApiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      if (data.status.code === 200 && data.results.length > 0) {
        const addressComponents = data.results[0].components;
        const city = addressComponents.city || addressComponents.town || addressComponents.village || '';
        const state = addressComponents.state || '';
        const country = addressComponents.county || '';
        const district = addressComponents.state_district || '';
        let suburb =  data.results[0].formatted || '';
        // suburb = suburb.replace(/, \d{6}(, India)?$/, ''); // Remove 6-digit pin code and optional 'India' at the end
        // suburb = suburb.replace(/, \d{6}/, ''); // Remove 6-digit pin code if it appears before 'India'
        // suburb = suburb.replace(/, India$/, ''); // Remove 'India' if it appears at the end

        return { district, state, country ,city,suburb};
      } else {
        console.error('Geocoding API request failed:', data.status);
        return null;
      }
    })
    .catch((error) => {
      console.error('Error making geocoding API request:', error);
      return null;
    });
};

const FilterCoordinatesWithinRadius = () => {
  const [inputLatitude, setInputLatitude] = useState('14.1431');
  const [inputLongitude, setInputLongitude] = useState('75.6652');
  const [filteredCoordinates, setFilteredCoordinates] = useState([]);
  const [radius, setRadius] = useState(100); // Radius in kilometers
  const [detailedLocations, setDetailedLocations] = useState([]);

  const coordinatesArray = [
 
      { name: "Shimoga", latitude: 13.9299, longitude: 75.5681 },
      { name: "Bhadravati", latitude: 13.8410, longitude: 75.7050 },
      { name: "Sagar", latitude: 14.1642, longitude: 75.0292 },
      { name: "Shikaripur", latitude: 14.2694, longitude: 75.3457 },
      { name: "Soraba", latitude: 14.3912, longitude: 75.0995 },
      { name: "Hosanagara", latitude: 13.9043, longitude: 75.0601 },
      { name: "Tirthahalli", latitude: 13.6888, longitude: 75.2424 },
      { name: "Nagara", latitude: 13.8040, longitude: 75.0443 },
      { name: "Guddekoppa", latitude: 13.8148, longitude: 75.3672 },
      { name: "Mandagadde", latitude: 13.7465, longitude: 75.3646 },
      { name: "Agumbe", latitude: 13.5081, longitude: 75.0908 },
      { name: "Holehonnur", latitude: 13.8612, longitude: 75.7101 },
      { name: "Channagiri", latitude: 14.0250, longitude: 75.9255 },
      { name: "Harihar", latitude: 14.5148, longitude: 75.8080 },
      { name: "Honnali", latitude: 14.2436, longitude: 75.6459 },
      { name: "Jagalur", latitude: 14.5277, longitude: 76.3388 },
      { name: "Nyamathi", latitude: 14.0912, longitude: 75.8217 },
      { name: "Santhebennur", latitude: 14.2072, longitude: 75.9218 },
      { name: "Bada", latitude: 14.0976, longitude: 75.9492 },
      { name: "Holalkere", latitude: 14.0423, longitude: 76.1844 },
      { name: "Davanagere", latitude: 14.4642, longitude: 75.9217 },
      { name: "Gundulpet", latitude: 13.7435, longitude: 75.4946 },
      { name: "Arebilachi", latitude: 14.0845, longitude: 76.0383 },
      { name: "Arehalli", latitude: 14.0287, longitude: 75.9683 },
      { name: "Yediyur", latitude: 14.1332, longitude: 75.9815 },
      // Villages from Honnali Taluk
      { name: "Kundur", latitude: 14.2834, longitude: 75.6009 },
      { name: "Madapura", latitude: 14.2678, longitude: 75.6267 },
      { name: "Hosahalli", latitude: 14.2647, longitude: 75.6502 },
      { name: "Chikkonahalli", latitude: 14.2378, longitude: 75.6789 },
      { name: "Mallenahalli", latitude: 14.2523, longitude: 75.6954 },
      { name: "Hanumanahalli", latitude: 14.2201, longitude: 75.7156 },
      { name: "Bannihatti", latitude: 14.2304, longitude: 75.6452 },
      { name: "Hulivana", latitude: 14.1903, longitude: 75.6407 },
      { name: "Bannihatti", latitude: 14.2104, longitude: 75.6652 },
      { name: "Jagaluru", latitude: 14.2833, longitude: 75.5904 },
      { name: "Kuvempu", latitude: 14.2651, longitude: 75.6503 },
      { name: "Tadigol", latitude: 14.2708, longitude: 75.6354 },
    { "name": "davanager", "latitude": 14.450705541568599, "longitude": 75.91186609857012 },
    { "name": "malebennuru", "latitude": 14.353494393402245, "longitude": 75.74166611170314 },
    { "name": "gajannuru", "latitude": 13.854258999234897, "longitude": 75.5223575699657 },
    { "name": "honali", "latitude": 14.23879363154477, "longitude": 75.64733081995617 },
    { "name": "Bengaluru Urban", "latitude": 13.101710893028478, "longitude": 77.54733673982884 },
    { "name": "Bidar", "latitude": 17.9135, "longitude": 77.5183 },
    { "name": "Chamarajanagar", "latitude": 11.9237, "longitude": 76.9476 },
    { "name": "Chikkaballapura", "latitude": 13.4355, "longitude": 77.7319 },
    { "name": "Chikmagalur", "latitude": 13.3153, "longitude": 75.7754 },
    { "name": "Chitradurga", "latitude": 14.2231, "longitude": 76.4003 },
    { "name": "Dakshina Kannada", "latitude": 12.9141, "longitude": 74.8560 },
    { "name": "Davanagere", "latitude": 14.153481837411203, "longitude": 75.67403640951848 },
    { "name": "Dharwad", "latitude": 15.4551, "longitude": 75.0068 },
    { "name": "Gadag", "latitude": 15.4249, "longitude": 75.6377 },
    { "name": "Hassan", "latitude": 13.0072, "longitude": 76.1020 },
    { "name": "Haveri", "latitude": 14.7957, "longitude": 75.6912 },
    { "name": "Kalaburagi (Gulbarga)", "latitude": 17.3291, "longitude": 76.8343 },
    { "name": "Kodagu (Coorg)", "latitude": 12.3375, "longitude": 75.8068 },
    { "name": "Kolar", "latitude": 13.1366, "longitude": 78.1290 },
    { "name": "Koppal", "latitude": 15.3556, "longitude": 76.1549 },
    { "name": "Mandya", "latitude": 12.5249, "longitude": 76.8954 },
    { "name": "Mysuru", "latitude": 12.2958, "longitude": 76.6394 },
    { "name": "Raichur", "latitude": 16.2140, "longitude": 77.3435 },
    { "name": "Ramanagara", "latitude": 12.7204, "longitude": 77.2748 },
    { "name": "Shivamogga (Shimoga)", "latitude": 14.014028169572855, "longitude":  75.68571015176882 },
    { "name": "Tumakuru (Tumkur)", "latitude": 13.3409, "longitude": 77.1000 },
    { "name": "Udupi", "latitude": 13.3409, "longitude": 74.7421 },
    { "name": "Uttara Kannada (Karwar)", "latitude": 14.6349, "longitude": 74.7538 },
    { "name": "Vijayapura (Bijapur)", "latitude": 16.8302, "longitude": 75.7100 },
    { "name": "Yadgir", "latitude": 16.7687, "longitude": 77.1386 }
  ];

  const handleLatitudeChange = (e) => setInputLatitude(e.target.value);
  const handleLongitudeChange = (e) => setInputLongitude(e.target.value);
  const handleRadiusChange = (e) => setRadius(e.target.value);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => value * Math.PI / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filterCoordinates = async () => {
    // if (!inputLatitude || !inputLongitude || !radius) {
    //   alert('Please enter valid latitude, longitude, and radius.');
    //   return;
    // }

  

    //setFilteredCoordinates(filtered);

    const detailed = await Promise.all(coordinatesArray.map(async (coord) => {
      const details = await fetchDistrictFromCoordinates(coord.latitude, coord.longitude);
      return { ...coord, ...details };
    }));

    setDetailedLocations(detailed);
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
        <label>Radius (km):</label>
        <input type="text" value={radius} onChange={handleRadiusChange} />
      </div>
      <button onClick={filterCoordinates}>Filter Coordinates</button>

      <h2>Filtered Coordinates:</h2>
      <ul>
        {detailedLocations.map((coord, index) => (
          <li key={index}>
            <p><strong>Name:</strong> {coord.name}</p>
            <p><strong>suburb:</strong> {coord.suburb}</p>
            <p><strong>Address:</strong> {coord.city} , {coord.country},{coord.district},{coord.state}</p>
 
            
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCoordinatesWithinRadius;

import React, { useState, useEffect } from 'react';

const CurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [district, setDistrict] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Fetch district based on latitude and longitude
          fetchDistrictFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);

  const fetchDistrictFromCoordinates = (latitude, longitude) => {
    // Replace 'YOUR_GOOGLE_API_KEY' with your Google Maps Geocoding API key
    const apiKey = 'AIzaSyA0ZqdBPzMZZBJ3O8bc5p-HtlQptpHIxJE';

    // Define the Google Maps Geocoding API endpoint
    const geocodingApiEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    // Make a GET request to the API
    fetch(geocodingApiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          // Parse the results to find the district
          const addressComponents = data.results[0].address_components;
          for (const component of addressComponents) {
            if (component.types.includes('administrative_area_level_3')) {
              const district = component.long_name;
              setDistrict(district);
              console.log('District:', district);
              break;
            }
          }
        } else {
          console.error('Geocoding API request failed:', data.status);
        }
      })
      .catch((error) => {
        console.error('Error making geocoding API request:', error);
      });
  };

  return (
    <div>
      <h2>Your Current Location:</h2>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>Loading your location...</p>
      )}

      {district && (
        <div>
          <h2>Your District:</h2>
          <p>{district}</p>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Current Location Example</h1>
      <CurrentLocation />
    </div>
  );
}

export default App;

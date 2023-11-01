import { createContext, useState, useContext,useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Fetch district based on latitude and longitude
          // fetchDistrictFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);
  const loginUser = (userData) => {
    setUser(userData);
  };
  const logoutUser = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser,location }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

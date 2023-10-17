import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Your useEffect for checking user authentication status here.

  const loginUser = (userData) => {
    // Logic to set the user after a successful login.
    console.log("dayasudhan",userData)
    setUser(userData);
  };

  const logoutUser = () => {
    // Logic to log the user out.
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import { createContext, useEffect, useState } from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const loginUser = (userData) => {
    // Logic to set the user after a successful login.
    setUser(userData);
  };

  const logoutUser = () => {
    // Logic to log the user out.
    setUser(null);
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      
      console.log("user",user)
      setUser(user);
      if(user){
        user.getIdToken().then((tkn)=>{
          // set access token in session storage
          console.log("tkn",tkn)
          setToken(tkn)
          // sessionStorage.setItem("accessToken", tkn);
          // setAuthorizedUser(true);
        })
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user,token }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
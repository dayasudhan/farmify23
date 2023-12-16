import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';
import { useRouter } from 'next/router';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { loginUser } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/login', {username:userName,password:password}).then(response => {
        setTimeout(() => {
          console.log("loggedin successfully",response)
          const userData = { username: response?.data?.name }; 
          loginUser(userData);
          router.push('/dealer/enquiry');
        }, 1000); 
      })
      .catch(error => {
        console.error("error",error);
      });
    } catch (error) {
      console.error('Error uploading images: ', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
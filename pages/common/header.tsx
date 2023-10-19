  import React, { useState, useEffect } from 'react';
  import { Menu, Modal, Form, Button } from 'semantic-ui-react';
  import { useAuth } from './../authContext';
  import axios from 'axios';
  import { useRouter } from 'next/router';
  function Header() {
    const { user, loginUser, logoutUser } = useAuth();
    const [activeItem, setActiveItem] = useState('home');
    const [sellerrefLink] = useState('/seller/post');
    const [homerefLink] = useState('/buyer/landing/landing');
    const [enquiryrefLink] = useState('/enquiry/enquiry');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const router = useRouter();
    console.log("user",user)
    useEffect(() => {
      try {
        axios.get('/session').then(response => {
          setTimeout(() => {
            console.log("session response",response)
            if(response?.data?.user?.auntheticated)
            {
              const userData =  response?.data?.user ; 
              loginUser(userData);
            }
          }, 1000); 
        })
        .catch(error => {
          console.error("error",error);
        });
      } catch (error) {
        console.error('Error', error);
      }
    },[]);
    const handleItemClick = (e, { name, href }) => {
      setActiveItem(name);
      console.log('Navigating to:', href);
    };
    const handleOk = async (e) => {
      router.push('/');
    };
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await axios.post('/login', loginData).then(response => {
          setIsLoginModalOpen(false);
          setTimeout(() => {
            console.log("loggedin successfully",response)
            const userData = { username: response?.data?.name }; 
            loginUser(userData);
          }, 1000); 
        })
        .catch(error => {
          console.error("error",error);
        });
      } catch (error) {
        console.error('Error uploading images: ', error);
      }
    };
    const handleLogout = async (e) => {
      console.log("handleLogout")
      e.preventDefault();
      try {
        await axios.get('/logout').then(response => {
          setTimeout(() => {
            console.log("handleLogout successfully",response)
            logoutUser();
            setIsLogoutModalOpen(true); 
            
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
      <Menu inverted secondary pointing size="mini" color="blue">
        <Menu.Item
          name="Home"
          active={activeItem === 'home'}
          href={homerefLink}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Sell"
          active={activeItem === 'sell'}
          href={sellerrefLink}
          onClick={handleItemClick}
        />
        {user && (
          <Menu.Item
            name="Enquiry"
            active={activeItem === 'enquiry'}
            href={enquiryrefLink}
            onClick={handleItemClick}
          />
        )}
        
          {user ? (
           <>      

              <Menu.Item
              position="right"
                name={`${user.username} logout`}
                onClick={handleLogout}
              />
          </>
          ) : (
            <Modal
              trigger={
                <Menu.Item
                position="right"
                  name="Dealer Login"
                  onClick={() => setIsLoginModalOpen(true)}
                />
              }
              open={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            >
              <Modal.Header>Login</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Input
                    label="Username"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={(e, { value }) =>
                      setLoginData({ ...loginData, username: value })
                    }
                  />
                  <Form.Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e, { value }) =>
                      setLoginData({ ...loginData, password: value })
                    }
                  />
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button primary onClick={handleLogin}>
                  Login
                </Button>
              </Modal.Actions>
            </Modal>
          )}
              <Modal
                open={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
              >
              <Modal.Header>Logout Successful</Modal.Header>
              <Modal.Content>
                <p>You have been successfully logged out.</p>
              </Modal.Content>
              <Modal.Actions>
                <Button primary onClick={handleOk}>
                  Ok
                </Button>
              </Modal.Actions>
            </Modal>
      </Menu>
    );
  }

  export default Header;

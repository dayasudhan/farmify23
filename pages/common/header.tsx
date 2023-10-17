import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { useAuth } from './../authContext';

function Header() {
  const { user } = useAuth();

  const [activeItem, setActiveItem] = useState('home');
  const [sellerrefLink] = useState('/seller/post');
  const [homerefLink] = useState('/buyer/landing/landing');
  const [enquiryrefLink] = useState('/enquiry/enquiry');

  const handleItemClick = (e, { name, href }) => {
    setActiveItem(name);
    // You can set the new route using React Router or your preferred routing library.
    // For simplicity, I'll just log the href here.
    console.log('Navigating to:', href);
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
      {user && <Menu.Item
        name="Enquiry"
        active={activeItem === 'enquiry'}
        href={enquiryrefLink}
        onClick={handleItemClick}
      />}
      <Menu.Item position="right" name={user?.username} />
    </Menu>
  );
}

export default Header;
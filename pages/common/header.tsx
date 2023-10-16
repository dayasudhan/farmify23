import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';
import { useContext } from 'react';
// import { AuthContext } from './../authContext';
// interface IAuthContext {
//   user: string | null;
//   token: string | null;
// }
export default class Header extends React.Component {
  // static contextType = AuthContext;
  // context!: React.ContextType<typeof AuthContext>;
  state = { 
    activeItem: 'home' ,
    sellerrefLink: '/seller/post',
    homerefLink: '/buyer/landing/landing',
    enquiryrefLink: '/enquiry/enquiry'
};

  handleItemClick = (e, { name ,href}) => {
    this.setState({ activeItem: name })
    this.setState({ refLink: href });
};

  render() {
    const { activeItem,sellerrefLink,homerefLink,enquiryrefLink } = this.state;
    // const { user, token } = this.context;
    return (
      <Menu inverted seconday pointing size="mini" color="blue">
        <Menu.Item
          name="Home"
          active={activeItem === 'home'}
          href={homerefLink}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Sell"
          active={activeItem === 'sell'}
          href={sellerrefLink}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Enquiry"
          active={activeItem === 'enquiry'}
          href={enquiryrefLink}
          onClick={this.handleItemClick}
        />
        <Menu.Item position="right"
          // name={user?.displayName}
         
        />
      </Menu>
    );
  }
}

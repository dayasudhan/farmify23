import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Header from '../common/header';

import Footer from '../common/footer';
import 'semantic-ui-css/semantic.css';
import ItemDetails from './ItemDetails';
import ReactGA from "react-ga4";
ReactGA.initialize("G-E36KXVXBE5");
export default class Cart extends Component {
  componentDidMount() {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname,title: "Sell Page" });
  }
  render() {
    return (
      <Segment>
        <Header />
        <ItemDetails />
        {/* <Footer /> */}
      </Segment>
    );
  }
}

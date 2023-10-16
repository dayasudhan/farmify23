import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Header from '../common/header';

import Footer from '../common/footer';
import 'semantic-ui-css/semantic.css';
import ItemDetails from './ItemDetails';

export default class Cart extends Component {
  render() {
    return (
      <Segment>
        <Header />
        <ItemDetails />
        <Footer />
      </Segment>
    );
  }
}

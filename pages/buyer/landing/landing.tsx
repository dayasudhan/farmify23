import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Header from '../../common/header';
import Footer from '../../common/footer';
import Items from './items';
import 'semantic-ui-css/semantic.css';

export default class Landing extends Component {
  render() {
    return (
      <Segment>
        <Header />
        <Items />
        <Footer />
      </Segment>
    );
  }
}

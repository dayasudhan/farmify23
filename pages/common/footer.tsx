import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import {
  Grid,
  Header,
  Segment,
  Container,
  List,
  Divider,
  Image,
} from 'semantic-ui-react';
// import './Footer.scss';

export default class Footer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Segment
        
        inverted
        vertical
        style={{ backgroundColor: '#398378',margin: '5em 0em 0em'}}
      >
        <Container textAlign="center">
          {/* <Grid divided inverted stackable>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Group 1" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Group 2" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Group 3" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as="h4" content="Footer Header" />
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid>

          <Divider inverted section /> */}
          {/* <Image centered size="mini" src="/logo.png" /> */}
          <List horizontal inverted divided link size="small">
            {/* <List.Item as="a" href="#">
              Site Map
            </List.Item> */}
            <List.Item as="a" href="/tractree/contactus">
              Contact Us
            </List.Item>
            <List.Item as="a" href="/tractree/terms&condition">
              Terms and Conditions
            </List.Item>
             <List.Item as="a" href="/tractree/apppolicy">
              Privacy Policy
            </List.Item>
            <List.Item as="a" href="/tractree/help">
              Help
            </List.Item>
            {/* <List.Item as="a" href="/tractree/landing">
              Landing
            </List.Item> */}
          </List>
        </Container>
      </Segment>
    );
  }
}

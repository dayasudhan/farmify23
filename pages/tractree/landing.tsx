import React, { Component } from 'react';
import { Container, Header, Button, Segment, Grid, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';

export default class LandingPage extends Component {
  render() {
    return (
      <Segment vertical style={{ padding: '5em 0em' }}>
        <Container text>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h1' style={{ fontSize: '4em', fontWeight: 'normal' }}>
                  Tractree
                  <Header.Subheader>ಹಳೆಯ ಕೃಷಿ ಉಪಕರಣಗಳ ಖರೀದಿ ಮತ್ತು ಮಾರಾಟದ ಅತ್ಯುತ್ತಮ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್</Header.Subheader>
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  ನೀವು ಹಳೆಯ ಟ್ರ್ಯಾಕ್ಟರ್‌ಗಳು ಅಥವಾ ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಮಾರಾಟ ಮಾಡಲು ಕಷ್ಟವಾಗುತ್ತಿದೆಯಾ? ಅಥವಾ ಹಳೆಯ ಉಪಕರಣಗಳನ್ನು ಖರೀದಿಸಲು ಹುಡುಕುತ್ತಿದ್ದೀರಾ?
                </p>
                <Button 
                  primary 
                  size='huge' 
                  onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.yourapp'} // Replace with your app's Google Play URL
                >
                  <Image 
                    src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Google_Play_Store_badge_EN.png' 
                    style={{ width: '150px', height: 'auto' }} 
                  />
                </Button>
              </Grid.Column>
              <Grid.Column width={6}>
                <Image
                  src='https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0'
                  alt='Tractree'
                  size='large'
                  style={{ marginTop: '3em' }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as='h2'>ನಮ್ಮ ಸೇವೆಗಳು</Header>
                  <ul>
                    <li>ಹಳೆಯ ಕೃಷಿ ಉಪಕರಣಗಳ ಖರೀದಿಗಾಗಿ ಸುಲಭವಾದ ಮಾರ್ಗ.</li>
                    <li>ಟ್ರ್ಯಾಕ್ಟರ್‌ಗಳನ್ನು ಖರೀದಿಸಲು ಮತ್ತು ಮಾರಾಟ ಮಾಡಲು ವೇದಿಕೆ.</li>
                    <li>ಉಪಕರಣಗಳ ವಿವರಗಳನ್ನು ಸರಳವಾಗಿ ಸೇರಿಸಲು ಮತ್ತು ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸಲು ಅವಕಾಶ.</li>
                  </ul>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment inverted vertical style={{ padding: '3em 0em' }}>
                  <Container textAlign='center'>
                    <Header as='h3' inverted>
                      ನಮ್ಮ ಸಂಪರ್ಕ ಮಾಹಿತಿ
                    </Header>
                    <li>ಇಮೇಲ್: tractree620@gmail.com</li>
                    <li>ಫೋನ್: +919902262044</li>
                  </Container>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

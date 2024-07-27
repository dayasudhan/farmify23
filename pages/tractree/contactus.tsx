import React, { Component } from 'react';
import { Segment, Grid, Header, Image } from 'semantic-ui-react';
import HeaderComponent from '../common/header';
import Footer from '../common/footer';
import 'semantic-ui-css/semantic.css';

export default class ContactUs extends Component {
  render() {
    return (
      <Segment>
        <HeaderComponent />
        <div style={{ padding: '1em' }}>
          <Header as='h2'>Contact Us</Header>

          <p>ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲು ಮತ್ತು ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ದಯವಿಟ್ಟು ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ಬಳಸಿಕೊಳ್ಳಿ:</p>
          
          <h3>ಮೊಬೈಲ್ ಆಪ್</h3>
          <p>ನೀವು Google Play Store ನಲ್ಲಿ ನಮ್ಮ ಆಪ್ ಅನ್ನು ಡೌನ್ಲೋಡ್ ಮಾಡಬಹುದು. <a href='https://play.google.com/store/apps/details?id=com.kuruvatech.farmify' target='_blank' rel='noopener noreferrer'>ಈ ಲಿಂಕ್</a> ಅನ್ನು ಬಳಸಿಕೊಂಡು ಡೌನ್ಲೋಡ್ ಮಾಡಬಹುದು.</p>
          
          <h3>ಇಮೇಲ್</h3>
          <p>ನಮ್ಮ ಬೆಂಬಲ ತಂಡವನ್ನು ಇಮೇಲ್ ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ:</p>
          <p><a href='mailto:kuruvatechnologies@gmail.com'>kuruvatechnologies@gmail.com</a></p>
          
          <h3>ಫೋನ್</h3>
          <p>ನೀವು ನಮ್ಮನ್ನು ಫೋನ್ ಮೂಲಕ ಸಂಪರ್ಕಿಸಬಹುದು:</p>
          <p>+919566229075</p>
          
          <h3>ವಿಳಾಸ</h3>
          <p>ನಮ್ಮ ಕಚೇರಿಯ ವಿಳಾಸ:</p>
          <p>ಕುರುವ,<br />
          ನ್ಯಾಮತಿ ತಾಲೂಕ್ , ದಾವಣಗೆರೆ ಜಿಲ್ಲೆ,<br />
          ಕರ್ನಾಟಕ-  577230</p>

          
        </div>
        {/* <Footer /> */}
      </Segment>
    );
  }
}

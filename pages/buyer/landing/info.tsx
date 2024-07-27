// src/components/landing/infoSegment.js
import React from 'react';
import { Segment, Image, Header, Grid } from 'semantic-ui-react';

const InfoSegment = () => (
  <Segment>
    <Grid>
      <Grid.Column width={8} textAlign='left'>
        <Header as='h2' style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src='https://farmifyequipments.s3.ap-south-1.amazonaws.com/apks/logo.png'
            style={{ marginRight: '10px', verticalAlign: 'middle' }}
          />
          <div>
            TracTree <br />
            <span style={{ fontSize: '0.7em' }}>
              ಹಳೆಯ ಕೃಷಿ ಉಪಕರಣಗಳ ವ್ಯಾಪಾರ ವೇದಿಕೆ
            </span>
          </div>
        </Header>
      </Grid.Column>
      <Grid.Column width={8} textAlign='right' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <a href='https://play.google.com/store/apps/details?id=com.kuruvatech.farmify' target='_blank' rel='noopener noreferrer'>
          <Image
            src='https://static-assets.animall.in/static/images/google-play-button.png'
            alt='Get it on Google Play'
            style={{ width: '200px' }}
          />
        </a>
      </Grid.Column>
    </Grid>
    {/* <p>
      ಹಳೆಯ ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಖರೀದಿಸುವ ಮತ್ತು ಮಾರುವಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತದೆ. 
      ಈ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಬಳಸುವ ಮೂಲಕ, ನೀವು ವ್ಯಾಪಾರಿಗಳನ್ನು ಮತ್ತು ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸಲು ಮತ್ತು ನಿಮಗೆ ಬೇಕಾದ 
      ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಸುಲಭವಾಗಿ ಖರೀದಿಸಿಬಹುದು.
    </p> */}
  </Segment>
);

export default InfoSegment;

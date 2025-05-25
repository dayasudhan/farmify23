// src/components/landing/infoSegment.js
import React from 'react';
import { Segment, Image, Header, Grid, Button, Container, List } from 'semantic-ui-react';

const InfoSegment = () => (
  <Segment
    vertical
    style={{
      padding: '4em 0',
      background: 'linear-gradient(to right, #e0f7fa, #e8f5e9)',
    }}
  >
    <Container>
                {/* ✅ App Screenshot at Bottom */}
        {/* <div style={{ textAlign: 'center', marginTop: '3em' }}>
          <Image
            src="https://play-lh.googleusercontent.com/_Vf1nYKyk6fGQphmKjza9zXL4Kk5wmXJY86sDRLSe8JBnDCRyjZZPx4TUQC8KdsNhw=w526-h296-rw"
            alt="App Screenshot"
            size="large"
            bordered
            style={{ borderRadius: '15px' }}
          />
        </div> */}
      <Grid stackable verticalAlign="middle">
        <Grid.Row columns={2}>
          {/* Left Section: Logo + Text */}
          <Grid.Column>
            <Header as="h1" style={{ fontSize: '2.5em', display: 'flex', alignItems: 'center' }}>
              <Image
                src="https://farmifyadda.s3.ap-south-1.amazonaws.com/tractree.png"
                size="big"
                style={{ marginRight: '20px' }}
              />
              <div>
                TracTree <br />
                <span style={{ fontSize: '0.6em', color: '#398378' }}>
                  ಹಳೆಯ ಕೃಷಿ ಉಪಕರಣಗಳ ಖರೀದಿ ಮತ್ತು ಮಾರಾಟ ಈಗ ಸುಲಭವಾಗಿದೆ!
                </span>
              </div>
            </Header>

            <p style={{ fontSize: '1.2em', marginTop: '1em', lineHeight: '1.6em' }}>
              ಟ್ರ್ಯಾಕ್ಟ್ರಿ ಆಪ್ ಮೂಲಕ ನೀವು ಹಳೆಯ ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಸುಲಭವಾಗಿ ಮಾರಾಟ ಮಾಡಬಹುದು ಅಥವಾ ಖರೀದಿಸಬಹುದು.
              ಈ ಆಪ್ ಬಳಸಿದರೆ, ನೀವು ನಿಮ್ಮ ಹತ್ತಿರದ ವ್ಯಾಪಾರಿಗಳು ಮತ್ತು ಖರೀದಿದಾರರೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕ ಹೊಂದಬಹುದು
              ಮತ್ತು ನಿಮಗೆ ಬೇಕಾದ ಉಪಕರಣಗಳನ್ನು ಸುಲಭವಾಗಿ ಹುಡುಕಿ ಖರೀದಿಸಬಹು.
            </p>

            <List >
              <List.Item>✔️ ಎಲ್ಲ ವಿಧದ ಹಳೆಯ ಕೃಷಿ ಉಪಕರಣ ಮಾರಾಟ ಮತ್ತು ಖರೀದಿಯ ಸುಲಭ ಅವಕಾಶ</List.Item>
              <List.Item>✔️ ಟ್ರ್ಯಾಕ್ಟರ್, ರೋಟಾವೇಟರ್, ಹಾರ್ವೆಸ್ಟರ್, ಪುಡರ್, ಥ್ರೆಷರ್, ಟ್ರಾಲಿ, ಕಲ್ಟಿವೇಟರ್...</List.Item>
              <List.Item>✔️ ಖರೀದಿದಾರರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ</List.Item>
              <List.Item>✔️ ನಿಮ್ಮ ಹತ್ತಿರದಲ್ಲಿ ಇರುವ ಉಪಕರಣಗಳನ್ನು ಸುಲಭವಾಗಿ ಹುಡುಕುವ ವ್ಯವಸ್ಥೆ</List.Item>
              <List.Item>✔️ ಮತ್ತು ಇದಕ್ಕಿಂತ ಮುಖ್ಯವಾಗಿ – ಎಲ್ಲವೂ ಉಚಿತ</List.Item>
            </List>

            <p style={{ fontSize: '1.2em', marginTop: '1.5em', fontWeight: 'bold', color: '#2e7d32' }}>
              ಇಂದೇ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ… ಟ್ರ್ಯಾಕ್ಟ್ರಿ ಆಪ್ ಬಳಸಿ … ಬದಲಾವಣೆ ಅನುಭವಿಸಿ!
            </p>

            <Button
              size="huge"
              as="a"
              href="https://play.google.com/store/apps/details?id=com.kuruvatech.farmify"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '1.5em',
                backgroundColor: '#398378', // your custom green
                color: 'white'              // text color
              }}
            >
              ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (Download App)
            </Button>
          </Grid.Column>

          {/* Right Section: Tractor & Implements Images */}
          <Grid.Column textAlign="center">
            <Grid stackable columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Image
                    src="https://farmifyadda.s3.ap-south-1.amazonaws.com/Bhoomi-313812223-1741853084372.jpg"
                    alt="Tractor"
                    size="medium"
                    rounded
                    bordered
                  />
                </Grid.Column>
                <Grid.Column>
                  <Image
                    src="https://farmifyadda.s3.amazonaws.com/Bhoomi-416986384-1747138521790.jpg"
                    alt="Rotavator"
                    size="medium"
                    rounded
                    bordered
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Rotary_tiller_compact.jpg"
                    alt="Thresher"
                    size="medium"
                    rounded
                    bordered
                  />
                </Grid.Column>
                <Grid.Column>
                  <Image
                    src="https://farmifyadda.s3.ap-south-1.amazonaws.com/Bhoomi-392113570-1744111126938.jpg"
                    alt="Trailer"
                    size="medium"
                    rounded
                    bordered
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    </Container>
  </Segment>
);

export default InfoSegment;

import React, { Component } from 'react';
import { Segment, Embed } from 'semantic-ui-react';
import Header from '../common/header';
import Footer from '../common/footer';
import 'semantic-ui-css/semantic.css';

export default class Help extends Component {
  render() {
    return (
      <Segment>
        <Header />
        <div style={{ padding: '1em' }}>
          <h2>ಸಹಾಯ ವಿಡಿಯೋಗಳು</h2>

          <h3>ನಮ್ಮ ಆಪ್ ಪರಿಚಯ</h3>
          <div style={{ marginBottom: '1em', maxWidth: '50%', height: 'auto' }}>
            <Embed
              id='-EBCKRnbtp4'
              placeholder='https://img.youtube.com/vi/-EBCKRnbtp4/hqdefault.jpg'
              source='youtube'
              iframe={{
                style: {
                  width: '100%',
                  height: '100%',
                },
              }}
            />
          </div>
          <h3>ನಮ್ಮ ಆಪ್ ಬಳಸುವ ವಿಧಾನ</h3>
          <div style={{ marginBottom: '1em', maxWidth: '50%', height: 'auto' }}>
            <Embed
              id='ouT9R3v8vWY'
              placeholder='https://img.youtube.com/vi/ouT9R3v8vWY/maxresdefault.jpg'
              source='youtube'
              iframe={{
                style: {
                  width: '100%',
                  height: '100%',
                },
              }}
            />
          </div>
          <h3>ನಮ್ಮ ಆಪ್ ಡೀಲರ್ ಬಳಸುವ ವಿಧಾನ</h3>
          <div style={{ marginBottom: '1em', maxWidth: '50%', height: 'auto' }}>
            <Embed
              id='UUoP4ueW8Rw'
              placeholder='https://img.youtube.com/vi/UUoP4ueW8Rw/hqdefault.jpg'
              source='youtube'
              iframe={{
                style: {
                  width: '100%',
                  height: '100%',
                },
              }}
            />
          </div>
          {/* <h1>ಸಹಾಯ ಡಾಕ್ಯುಮೆಂಟ್</h1>
          <p>ಟ್ರ್ಯಾಕ್ಟ್ರಿ ಆಪ್‌ನ ಸಹಾಯ ವಿಭಾಗಕ್ಕೆ ಸ್ವಾಗತ. ನಮ್ಮ ಸೇವೆಗಳನ್ನು ಬಳಸಲು ನೀವು ಸಹಾಯ ಮತ್ತು ಮಾಹಿತಿ ಇಲ್ಲಿದೆ ಕಂಡುಹಿಡಿಯಬಹುದು.</p> */}

          <h2>ಪ್ರಶ್ನೆಗಳು (FAQ)</h2>
          <h3>ಪ್ರಶ್ನೆ 1: 'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್ ಎಂದರೆ ಏನು?</h3>
          <p>'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್ ಹಳೆಯ ಟ್ರ್ಯಾಕ್ಟರ್‌ಗಳು ಮತ್ತು ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಖರೀದಿಸಲು ಮತ್ತು ಮಾರಾಟ ಮಾಡಲು ಸುಲಭವಾದ ಒಂದು ವೇದಿಕೆ.</p>
          
          <h3>ಪ್ರಶ್ನೆ 2: ನಾನು 'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್ ಅನ್ನು ಹೇಗೆ ಡೌನ್ಲೋಡ್ ಮಾಡಬಹುದು?</h3>
          <p>ನೀವು ಗೂಗಲ್ ಪ್ಲೇ ಸ್ಟೋರ್‌ನಲ್ಲಿ 'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್ ಅನ್ನು <a href='https://play.google.com/store/apps/details?id=com.kuruvatech.farmify' target='_blank' rel='noopener noreferrer'>ಹುಡುಕಿಕೊಂಡು ಡೌನ್ಲೋಡ್</a> ಮಾಡಬಹುದು. ಅಥವಾ ನೀವು <a href='https://play.google.com/store/apps/details?id=com.kuruvatech.farmify' target='_blank' rel='noopener noreferrer'>ಈ ಲಿಂಕ್</a> ಮೂಲಕ ಡೌನ್ಲೋಡ್ ಮಾಡಬಹುದು.</p>
          
          <h3>ಪ್ರಶ್ನೆ 3: 'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್‌ನಲ್ಲಿ ಯಾವ ರೀತಿಯ ಸೇವೆಗಳು ಲಭ್ಯವಿವೆ?</h3>
          <p>ನಮ್ಮ ಆಪ್‌ನಲ್ಲಿ, ನೀವು ಹಳೆಯ ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಮತ್ತು ಟ್ರ್ಯಾಕ್ಟರ್‌ಗಳನ್ನು ಸುಲಭವಾಗಿ ಖರೀದಿಸಬಹುದು ಮತ್ತು ಮಾರಾಟ ಮಾಡಬಹುದು. ನೀವು ಉಪಕರಣಗಳ ವಿವರಗಳನ್ನು ಸೇರಿಸಲು ಮತ್ತು ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತದೆ.</p>
          
          <h3>ಪ್ರಶ್ನೆ 4: ನಾನು ನನ್ನ ಉಪಕರಣಗಳ ವಿವರಗಳನ್ನು ಹೇಗೆ ಸೇರಿಸಬಹುದು?</h3>
          <p>ಆಪ್‌ನಲ್ಲಿ , 'ಮಾರಾಟ' ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ ಮತ್ತು ನೀವು ಮಾರಾಟ ಮಾಡಲು ಇಚ್ಛಿಸುವ ಉಪಕರಣದ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.</p>
          
          <h3>ಪ್ರಶ್ನೆ 5: ಖರೀದಿದಾರರನ್ನು ನಾನು ಹೇಗೆ ಹುಡುಕಬಹುದು?</h3>
          <p>ನೀವು ನಿಮ್ಮ ಉಪಕರಣಗಳ ವಿವರಗಳನ್ನು ಸೇರಿಸಿದ ನಂತರ,  ನಮ್ಮ ಡೀಲರ್ ನಿಮ್ಮನ್ನು ಮುಂದಿನ ವ್ಯವಹಾರಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸುತಾರೆs</p>
          
          <h3>ಪ್ರಶ್ನೆ 6: 'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್‌ನ ವೈಶಿಷ್ಟ್ಯಗಳೆನು?</h3>
          <p> - ಬಳಕೆಗೆ ಸುಲಭವಾದ ಇಂಟರ್ಫೇಸ್<br />
              - ವಿವಿಧ ಕೃಷಿ ಉಪಕರಣಗಳ ಆಯ್ಕೆ<br />
              - ನಿಮ್ಮ ಉಪಕರಣದ ವಿವರಗಳನ್ನು ಸುಲಭವಾಗಿ ಸೇರಿಸುವ ಮತ್ತು ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸುವ ಅವಕಾಶ</p>
          
          <h3>ಪ್ರಶ್ನೆ 7: 'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್‌ನಲ್ಲಿ ವ್ಯಾಪಾರ ಮಾಡಲು ಶುಲ್ಕವೇನಾದರೂ ಇದೆ?</h3>
          <p>'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್ ಬಳಕೆಯು ಉಚಿತವಾಗಿದೆ.</p>
          
                 
          <h3>ಪ್ರಶ್ನೆ 9: ತಾಂತ್ರಿಕ ಸಮಸ್ಯೆಗಳಿಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಪಡೆಯಬಹುದು?</h3>
          <p>'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್‌ನಲ್ಲಿ ತಾಂತ್ರಿಕ ಸಮಸ್ಯೆಗಳಿಗೆ, 'ಸೆಟ್ಟಿಂಗ್ಸ್' ವಿಭಾಗದಲ್ಲಿ 'ಸಹಾಯ' ಅಥವಾ 'ಕಸ್ಟಮರ್ ಸಪೋರ್ಟ್' ಆಯ್ಕೆಗಳನ್ನು ಬಳಸಬಹುದು.</p>
          
          <h3>ಪ್ರಶ್ನೆ 10: 'ಟ್ರಾಕ್ಟ್ರೀ' ಆಪ್‌ನ ಬಳಕೆಗಾಗಿ ಯಾವುದೇ ಗೈಡ್ ಅಥವಾ ಸಹಾಯದ ಮಾಹಿತಿಯು ಇದೆಯೇ?</h3>
          <p>ಹೌದು, ನೀವು 'ಆಪ್‌ಗಾಗಿ ಗೈಡ್' ಅಥವಾ 'ಹೆಲ್ಪ್' ವಿಭಾಗವನ್ನು ಪರಿಶೀಲಿಸುವ ಮೂಲಕ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಬಹುದು.</p>

          <h2>ಹೆಚ್ಚಿನ ಸಹಾಯಕ್ಕಾಗಿ</h2>
          <p>ನೀವು ಇನ್ನಷ್ಟು ಸಹಾಯ ಬೇಕಾದಲ್ಲಿ, ದಯವಿಟ್ಟು ನಮ್ಮ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ:</p>
          <ul>
            <li>ಇಮೇಲ್: tractree620@gmail.com</li>
            <li>ಫೋನ್: +919902262044</li>
          </ul>
        </div>
        {/* <Footer /> */}
      </Segment>
    );
  }
}

import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import HeaderComponent from '../common/header';
import Footer from '../common/footer';
import 'semantic-ui-css/semantic.css';
import ReactGA from "react-ga4";
ReactGA.initialize("G-E36KXVXBE5");

export default class PrivacyPolicy extends Component {
  componentDidMount() {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "PrivacyPolicy" });
  }

  render() {
    return (
      <Segment>
        <HeaderComponent />
        <div style={{ padding: '1em' }}>
          <Header as='h2'>ಗೌಪ್ಯತಾ ನೀತಿ | Privacy Policy</Header>

          {/* Kannada Section */}
          <h3>1. ಪರಿಚಯ</h3>
          <p>
            Tractree ಆಪ್ ಮತ್ತು tractree.in ವೆಬ್‌ಸೈಟ್ ಇವುBloombytech Solutions Private Limited ಮೂಲಕ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಇವು ಇತ್ತೀಚೆಗೆ ಭಾರತದಾದ್ಯಾಂತ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ. Tractree ನಿಮ್ಮ ಗೌಪ್ಯತೆಗೆ ಮಹತ್ವ ನೀಡುತ್ತದೆ. ಈ ಗೌಪ್ಯತಾ ನೀತಿ ನಿಮ್ಮ ಮಾಹಿತಿಯ ಸಂಗ್ರಹಣೆ, ಬಳಕೆ ಮತ್ತು ರಕ್ಷಣೆ ಹೇಗೆ ನಡೆಯುತ್ತದೆ ಎಂಬುದನ್ನು ವಿವರಿಸುತ್ತದೆ.
          </p>

          <h3>2. ನಾವು ಸಂಗ್ರಹಿಸುವ ಮಾಹಿತಿ</h3>
          <p>
            ನಾವು ನಿಮ್ಮಿಂದ ಫೋನ್ ಸಂಖ್ಯೆ, ಸ್ಥಳದ ಮಾಹಿತಿ (ಆಪ್ ಬಳಕೆಯ ಅವಶ್ಯಕತೆಯಾದಷ್ಟರ ಮಟ್ಟಿಗೆ), ಮತ್ತು ಉಪಕರಣದ ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸಬಹುದು. ನಾವು ಯಾವುದೇ ಅನಗತ್ಯವಾದ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.
          </p>

          <h3>3. ಮಾಹಿತಿಯ ಬಳಕೆ</h3>
          <p>
            ಸಂಗ್ರಹಿಸಿದ ಮಾಹಿತಿಯನ್ನು ಆಪ್ ಮತ್ತು ವೆಬ್‌ಸೈಟ್ ಸೇವೆಗಳನ್ನು ಉತ್ತಮಗೊಳಿಸಲು, ಬಳಕೆದಾರರನ್ನು ಸಂಪರ್ಕಿಸಲು, ಮತ್ತು ಸುರಕ್ಷತೆಯನ್ನು ಖಚಿತಪಡಿಸಲು ಬಳಸಲಾಗುತ್ತದೆ.
          </p>

          <h3>4. ತೃತೀಯ ಪಕ್ಷದೊಂದಿಗೆ ಮಾಹಿತಿಯ ಹಂಚಿಕೆ</h3>
          <p>
            ನಾವು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಯಾವುದೇ ತೃತೀಯ ಪಕ್ಷದೊಂದಿಗೆ ನಿಮ್ಮ ಅನುಮತಿಯಿಲ್ಲದೇ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ, ಹೊರತು ಕಾನೂನಾತ್ಮಕ ಅವಶ್ಯಕತೆಗಳ ಹೊರತಾಗಿ.
          </p>

          <h3>5. ಡೇಟಾ ಸುರಕ್ಷತೆ</h3>
          <p>
            ನಿಮ್ಮ ಡೇಟಾ ಸುರಕ್ಷಿತವಾಗಿಡಲು ನಾವು ಲಾಜಿಕಲ್ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ ರಕ್ಷಣೆಗಳನ್ನು ಅನುಸರಿಸುತ್ತೇವೆ. ಆದಾಗ್ಯೂ, ಆನ್‌ಲೈನ್‌ನಲ್ಲಿನ ಯಾವುದೇ ಡೇಟಾ ಸಂಗ್ರಹಣೆ 100% ಸುರಕ್ಷಿತವಾಗಿರುವುದಿಲ್ಲ ಎಂಬುದನ್ನು ಗಮನದಲ್ಲಿಡಿ.
          </p>

          <h3>6. ಬಾಲಕರ ಗೌಪ್ಯತೆ</h3>
          <p>
            Tractree ಆಪ್ ಅಥವಾ tractree.in ವೆಬ್‌ಸೈಟ್ 18 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನ ಮಕ್ಕಳಿಂದ ಮಾಹಿತಿಯನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.
          </p>

          <h3>7. ನಿಮ್ಮ ಹಕ್ಕುಗಳು</h3>
          <p>
            ನೀವು ನಿಮ್ಮ ಮಾಹಿತಿಗೆ ಪ್ರವೇಶ ಪಡೆಯುವ, ತಿದ್ದುಪಡಿ ಮಾಡುವ ಅಥವಾ ಅಳಿಸುವ ಹಕ್ಕು ಹೊಂದಿದ್ದೀರಿ. ಇಂಥ ವಿನಂತಿಗಳನ್ನು tractree620@gmail.com ಗೆ ಕಳಿಸಬಹುದು.
          </p>

          <h3>8. ಗೌಪ್ಯತಾ ನೀತಿಯ ಬದಲಾವಣೆಗಳು</h3>
          <p>
            ನಾವು ಈ ಗೌಪ್ಯತಾ ನೀತಿಯನ್ನು ಅವಶ್ಯಕತೆಯಂತೆ ಪರಿಷ್ಕರಿಸಬಹುದು. ಯಾವುದೇ ಬದಲಾವಣೆಗಳಿಗಾಗಿ ದಯವಿಟ್ಟು ಈ ಪುಟವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.
          </p>

          <h3>9. ಸಂಪರ್ಕಿಸಿ</h3>
          <p>
            ಈ ಗೌಪ್ಯತಾ ನೀತಿಯ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ, ದಯವಿಟ್ಟು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ:
          </p>
          <p>ಇಮೇಲ್: <a href="mailto:tractree620@gmail.com">tractree620@gmail.com</a></p>
          <p>ಫೋನ್: +919902262044</p>

          {/* English Section */}
          <Header as='h3'>Privacy Policy</Header>

          <h3>1. Introduction</h3>
          <p>
            Tractree operates through the Tractree mobile app and the website <strong>tractree.in</strong>. It is now functioning across India and is registered as <strong>Bloombytech Solutions Private Limited</strong>. We respect your privacy, and this privacy policy outlines how we collect, use, and protect your information.
          </p>

          <h3>2. Information We Collect</h3>
          <p>
            We may collect your phone number, location data (as required for app functionality), and information about your listed equipment. We do not collect any unnecessary personal data.
          </p>

          <h3>3. Use of Information</h3>
          <p>
            The collected information is used to improve our services on both the app and website, facilitate user interactions, and ensure safety.
          </p>

          <h3>4. Sharing with Third Parties</h3>
          <p>
            We do not share your data with any third party without your consent, except when required by law.
          </p>

          <h3>5. Data Security</h3>
          <p>
            We implement logical and technical safeguards to protect your data. However, no online data transmission is 100% secure.
          </p>

          <h3>6. Children’s Privacy</h3>
          <p>
            Tractree does not knowingly collect data from children under the age of 18 through its app or website.
          </p>

          <h3>7. Your Rights</h3>
          <p>
            You have the right to access, correct, or delete your personal data. You can send such requests to tractree620@gmail.com.
          </p>

          <h3>8. Changes to Privacy Policy</h3>
          <p>
            We may update this privacy policy as needed. Please review this page regularly for any changes.
          </p>

          <h3>9. Contact Us</h3>
          <p>
            If you have any questions about this privacy policy, please contact us:
          </p>
          <p>Email: <a href="mailto:tractree620@gmail.com">tractree620@gmail.com</a></p>
          <p>Phone: +919902262044</p>
        </div>
        <Footer />
      </Segment>
    );
  }
}

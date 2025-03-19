import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import HeaderComponent from '../common/header';
import Footer from '../common/footer';
import 'semantic-ui-css/semantic.css';
import ReactGA from "react-ga4";
ReactGA.initialize("G-E36KXVXBE5");

export default class TermsAndConditions extends Component {
  componentDidMount() {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname,title: "TermsAndConditions" });
  }
  render() {
    return (
      <Segment>
        <HeaderComponent />
        <div style={{ padding: '1em' }}>
          <Header as='h2'>ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು | Terms and Conditions</Header>

          {/* Kannada Section */}
          <h3>1. ಪರಿಚಯ</h3>
          <p>
            Tractree ಗೆ ಸ್ವಾಗತ! ನಮ್ಮ ಆಪ್ ಅನ್ನು ಬಳಸುವುದರ ಮೂಲಕ, ನೀವು ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಪಾಲಿಸಲು ಒಪ್ಪಿಕೊಳ್ಳುತ್ತೀರಿ. ದಯವಿಟ್ಟು ಅವುಗಳನ್ನು ಪೂರ್ಣವಾಗಿ ಓದಿ.
          </p>

          <h3>2. Tractree ಆಪ್‌ನ ಜವಾಬ್ದಾರಿ</h3>
          <p>
            Tractree ಆಪ್‌ನ ಪ್ರಮುಖ ಜವಾಬ್ದಾರಿ ಮಾರಾಟಗಾರರು ಮತ್ತು ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸುವುದಾಗಿದೆ. Tractree ಆಪ್ ಯಾವುದೇ ಹಣಕಾಸು ವ್ಯವಹಾರಗಳು ಅಥವಾ ಉಪಕರಣದ ಗುಣಮಟ್ಟದ ಬಗ್ಗೆ ಹೊಣೆಗಾರರಲ್ಲ. Tractree ಆಪ್ ಮೂಲಕ ನೀವು ಸಂಪರ್ಕ ಹೊಂದಿದ ನಂತರ, ಎಲ್ಲಾ ಪಾವತಿಗಳು, ಖರೀದಿ ಮತ್ತು ಮಾರಾಟದ ಕುರಿತು ಚರ್ಚೆಗಳು ನೇರವಾಗಿ ಖರೀದಿದಾರರು ಮತ್ತು ಮಾರಾಟಗಾರರ ನಡುವೆ ನಡೆಯಬೇಕು. ಆನ್‌ಲೈನ್‌ ಹಣ ವರ್ಗಾವಣೆ ಅಥವಾ ವಸ್ತುಗಳ ಗುಣಮಟ್ಟಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಯಾವುದೇ ವಿಷಯಗಳಿಗೆ Tractree ಆಪ್ ಹೊಣೆಗಾರರಲ್ಲ.
          </p>

          <h3>3. ಹಣಕಾಸು ವ್ಯವಹಾರಗಳಿಲ್ಲ</h3>
          <p>
            Tractree ಯಾವುದೇ ಹಣಕಾಸು ವ್ಯವಹಾರಗಳನ್ನು ನಡೆಸುವುದಿಲ್ಲ. ಎಲ್ಲಾ ಪಾವತಿಗಳು ಮತ್ತು ವಿನಿಮಯಗಳನ್ನು ನೇರವಾಗಿ ಖರೀದಿದಾರರು ಮತ್ತು ಮಾರಾಟಗಾರರ ನಡುವೆ ಮಾಡಬೇಕು. ಹಣಕಾಸು ವ್ಯವಹಾರಗಳ ಯಾವುದೇ ಭಾಗಕ್ಕಾಗಿ Tractree ಹೊಣೆಗಾರರಾಗುವುದಿಲ್ಲ.
          </p>

          <h3>4. ಬಳಕೆದಾರ ಖಾತೆಗಳು</h3>
          <p>
            ಬಳಕೆದಾರರು ಖಾತೆ ನಿರ್ಮಿಸಲು ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ಒದಗಿಸಬೇಕು. ನಾವು ಅನುಮತಿ ಪಡೆಯದ ಅಥವಾ ವಂಚನೆಯ ಚಟುವಟಿಕೆಗಳನ್ನು ಅನುಮಾನಿಸಿದ ಖಾತೆಗಳನ್ನು ಅಮಾನ್ಯಗೊಳಿಸುವ ಹಕ್ಕನ್ನು ಹೊಂದಿದ್ದೇವೆ.
          </p>

          <h3>5. ಜಾಹಿರಾತುಗಳು</h3>
          <p>
            ಮಾರಾಟಗಾರರು ತಮ್ಮ ಜಾಹಿರಾತುಗಳು ನಿಖರವಾಗಿದ್ದು ಸತ್ಯವಾಗಿರಬೇಕು ಎಂಬುದಕ್ಕಾಗಿ ಹೊಣೆಗಾರರಾಗಿರುತ್ತಾರೆ. ಜಾಹಿರಾತುಗಳಲ್ಲಿ ಯಾವುದೇ ತಪ್ಪು ಅಥವಾ ತಪ್ಪಾದ ಮಾಹಿತಿಗಾಗಿ Tractree ಹೊಣೆಗಾರರಲ್ಲ.
          </p>

          <h3>6. ಮಾರಾಟಗಾರರ ಜವಾಬ್ದಾರಿ</h3>
          <p>
            ಮಾರಾಟಗಾರರು ತಾವು ಮಾರಾಟ ಮಾಡುತ್ತಿರುವ ಉಪಕರಣದ ಸಂಪೂರ್ಣ ಮತ್ತು ನಿಖರ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಬೇಕು. ಯಾವುದೇ ವಸ್ತುವಿನ ಸ್ಥಿತಿ, ಅದರ ಗುಣಮಟ್ಟ ಮತ್ತು ಅದರ ಸಂಬಂಧಿಸಿದ ದಾಖಲೆಗಳನ್ನು ಖರೀದಿದಾರರಿಗೆ ಸ್ಪಷ್ಟವಾಗಿ ತಿಳಿಸಬೇಕು. ಮಾರಾಟ ಮಾಡಿದ ಉಪಕರಣಗಳ ಗುಣಮಟ್ಟದ ಬಗ್ಗೆ Tractree ಆಪ್ ಯಾವುದೇ ಜವಾಬ್ದಾರಿಯನ್ನು ವಹಿಸುವುದಿಲ್ಲ.
          </p>

          <h3>7. ಖರೀದಿದಾರರ ಜವಾಬ್ದಾರಿ</h3>
          <p>
            ಖರೀದಿದಾರರು ತಾವು ಖರೀದಿಸುವ ಉಪಕರಣದ ಗುಣಮಟ್ಟ ಮತ್ತು ಇತರ ವಿವರಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಪರಿಶೀಲಿಸಬೇಕು. Tractree ಆಪ್ ಉಪಕರಣದ ಗುಣಮಟ್ಟ ಅಥವಾ ಯಾವುದೇ ಸಮಸ್ಯೆಗಳಿಗಾಗಿ ಹೊಣೆಗಾರರಲ್ಲ.
          </p>
          <p>
            ಈ ವಿಶೇಷ ವೇದಿಕೆಯಲ್ಲಿ ನಡೆಯುವ ವ್ಯವಹಾರಗಳಿಗೂ ಅಡ್ಮಿನ್‌ಗಳಿಗೂ ಯಾವುದೇ ಸಂಬಂಧ ಇರುವುದಿಲ್ಲ. ನಿಮ್ಮ ವ್ಯವಹಾರಗಳನ್ನು ನೇರವಾಗಿ ಮುಖಾಮುಖಿ ಕುಳಿತು ಮಾಡಿಕೊಳ್ಳಿ ಹಾಗೂ ಯಾವುದೇ ವ್ಯಕ್ತಿಗೆ ಆನ್ಲೈನ್ ಮುಖಾಂತರ ಹಣ ವರ್ಗಾವಣೆ ಮಾಡಬೇಡಿ. ದಯವಿಟ್ಟು ಎಚ್ಚರಿಕೆಯಿಂದ ವ್ಯವಹರಿಸಿ, ಯಾರಿಂದಲೂ ಮೋಸ ಆಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.
          </p>

          <h3>8. ಗೌಪ್ಯತೆ</h3>
          <p>
            ನಿಮ್ಮ ಗೌಪ್ಯತೆ ನಮಗೆ ಮಹತ್ವವಾಗಿದೆ. ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ನಮ್ಮ ಗೌಪ್ಯತಾ ನೀತಿಯ ಪ್ರಕಾರ ನಿಭಾಯಿಸಲಾಗುತ್ತದೆ. ನಿಮ್ಮ ಅನುಮತಿಯಿಲ್ಲದೆ ಯಾವುದೇ ಬಳಕೆದಾರರ ಮಾಹಿತಿಯನ್ನು ಮಾರಲಾಗುವುದಿಲ್ಲ ಅಥವಾ ಹಂಚಲಾಗುವುದಿಲ್ಲ.
          </p>

          <h3>9. ಹೊಣೆಗಾರಿಕೆಯ ಮಿತಿಯು</h3>
          <p>
            Tractree ಆಪ್ ಬಳಕೆಗೊಳ್ಳುವುದರಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ನಷ್ಟ ಅಥವಾ ಹಾನಿಗೆ ಹೊಣೆಗಾರರಲ್ಲ. ಆಪ್ ಬಳಕೆ ನಿಮ್ಮ ತತ್ ಸ್ವಂತ ಜವಾಬ್ದಾರಿಯಾಗಿದೆ.
          </p>

          <h3>10. ನಿಯಮಗಳ ಬದಲಾವಣೆ</h3>
          <p>
            ನಾವು ಈ ನಿಯಮಗಳನ್ನು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಬದಲಾಯಿಸುವ ಹಕ್ಕನ್ನು ಹೊಂದಿದ್ದೇವೆ. ಬಳಕೆದಾರರಿಗೆ ಯಾವುದೇ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ನೋಟಿಫಿಕೇಶನ್ ನೀಡಲಾಗುವುದು ಮತ್ತು ಆಪ್ ಬಳಕೆ ಮುಂದುವರಿಯುವುದು ತಿದ್ದುಪಡಿಯ ನಿಯಮಗಳನ್ನು ಒಪ್ಪುವಂತೆ ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.
          </p>

          <h3>11. ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ</h3>
          <p>ಈ ನಿಯಮಗಳು ಕುರಿತು ನೀವು ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದೆಯೇ ಅಥವಾ ಚಿಂತೆಗಳಿದೆಯೇ, ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ:</p>
          <p>ಇಮೇಲ್: <a href="mailto:tractree620@gmail.com">tractree620@gmail.com</a></p>
          <p>ಫೋನ್: +919902262044</p>

          {/* English Section */}
          <Header as='h3'>Terms and Conditions</Header>

          <h3>1. Introduction</h3>
          <p>
          Bloombytech Solutions Private Limited (hereinafter referred to as “Tractree” or “We” or “Us” or “Our”) welcome you at www.tractree.in / Tractree Mobile App(A venture of Bloombytech) . By using our app, you agree to these terms and conditions. Please read them carefully.
          </p>

          <h3>2. Tractree App Responsibility</h3>
          <p>
            The primary responsibility of the Tractree app is to connect buyers and sellers. Tractree is not responsible for any financial transactions or the quality of the equipment. After connecting through the Tractree app, all payments and discussions regarding purchases and sales must be handled directly between buyers and sellers. Tractree is not liable for any issues related to online transfers or the quality of the items listed.
          </p>

          <h3>3. No Financial Transactions</h3>
          <p>
            Tractree does not handle any financial transactions. All payments must be conducted directly between buyers and sellers. Tractree will not be responsible for any part of the financial dealings.
          </p>

          <h3>4. User Accounts</h3>
          <p>
            Users are required to provide a phone number to create an account. We reserve the right to suspend accounts suspected of fraudulent or unauthorized activities.
          </p>

          <h3>5. Advertisements</h3>
          <p>
            Sellers are responsible for ensuring that the information in their advertisements is accurate and truthful. Tractree is not responsible for any errors or misrepresentation in listings.
          </p>

          <h3>6. Seller's Responsibility</h3>
          <p>
            Sellers must provide complete and accurate information about the equipment they are selling. It is the seller’s responsibility to disclose the condition, quality, and related documentation of the equipment. Tractree will not be responsible for the quality of the items sold.
          </p>

          <h3>7. Buyer’s Responsibility</h3>
          <p>
            Buyers must thoroughly inspect the quality and other details of the equipment they intend to purchase. Tractree is not responsible for the quality or any issues related to the equipment. Tractree’s role is limited to connecting buyers and sellers, and it is not liable for any issues regarding quality or financial transactions.
          </p>
          <p>
            The platform and admins have no responsibility for any transactions that occur. Please conduct your transactions in person and do not transfer money online. Verify the equipment documents thoroughly and ensure that all details are correct before purchasing.
          </p>

          <h3>8. Privacy</h3>
          <p>
            Your privacy is important to us. Your information is handled according to our privacy policy. We do not share or sell user information without consent.
          </p>

          <h3>9. Limitation of Liability</h3>
          <p>
            Tractree is not responsible for any loss or damage resulting from the use of the app. Use of the app is at your own risk.
          </p>

          <h3>10. Changes to Terms</h3>
          <p>
            We reserve the right to modify these terms at any time. Users will be notified of any changes, and continued use of the app implies acceptance of the modified terms.
          </p>

          <h3>11. Contact Us</h3>
          <p>If you have any questions or concerns regarding these terms, contact us:</p>
          <p>Email: <a href="mailto:tractree620@gmail.com">tractree620@gmail.com</a></p>
          <p>Phone: +919902262044</p>
        </div>
        <Footer />
      </Segment>
    );
  }
}

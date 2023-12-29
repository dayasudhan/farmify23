import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Header from '../common/header';

import Footer from '../common/footer';
import 'semantic-ui-css/semantic.css';

export default class Cart extends Component {
  render() {
    return (
      <Segment>
        <Header />
        Privacy Policy
Last Updated: [Date]

[Your Company Name] ("us", "we", or "our") operates the [Your App Name] mobile application (the "App").

This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our App and the choices you have associated with that data.

Information Collection and Use
We do not collect personally identifiable information unless you explicitly provide it to us. However, the App may request access to your device's camera for the following purposes:

Camera Access
The App requires access to your device's camera to [explain the purpose, e.g., capture photos, enable augmented reality features, etc.]. We do not store or transmit any images or videos captured by the camera to our servers.

Consent
By using the App, you consent to the terms of this Privacy Policy.

Disclosure of Data
We do not disclose your personal information to third parties unless required by law or with your explicit consent.

Security
The security of your data is important to us, but remember that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.

Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

Contact Us
If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at [your contact email].
        <Footer />
      </Segment>
    );
  }
}

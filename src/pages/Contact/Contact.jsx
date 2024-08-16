import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./Contact.css";

const Contact = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="contactBox">
        <h2><strong>Have Questions? Contact Us!</strong></h2>
        <p>We're here to help! Whether you need assistance with your booking, have questions about our services, or just want to learn more, feel free to reach out to us.</p>
        <br />
        <h2><strong>Email:</strong> info@vcsrentals.lt</h2>
        <h2><strong>Phone Numbers:</strong> Lithuania: +370 612 34567 / International (UK): +44 20 7946 1234</h2>
        <p><strong>Working Hours:</strong> Our customer support team is available 24/7 to assist you with any inquiries.</p>
        <div className="map-container">
          <iframe
            width="100%"
            height="200"
            src="https://www.openstreetmap.org/export/embed.html?bbox=25.2715%2C54.6825%2C25.2879%2C54.6919&amp;layer=mapnik"
            style={{ border: 5, borderRadius: 10, }}
            allowFullScreen
          ></iframe>
          <br />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Contact;

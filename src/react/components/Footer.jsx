import React from 'react';
import '../../css/footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-brand">SkyJet</div>
    <div className="footer-grid">
      <div>
        <h4>Corporate</h4>
        <ul>
          <li>About Us</li>
          <li>Vision & Mission</li>
          <li>Policies</li>
          <li>Tender Notices</li>
        </ul>
      </div>
      <div>
        <h4>Media</h4>
        <ul>
          <li>Press & News</li>
          <li>Announcements</li>
          <li>Gallery</li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>Baggage Tracking</li>
          <li>Customer Care</li>
          <li>Agency Support</li>
        </ul>
      </div>
      <div className="newsletter">
        <p>Follow campaigns by entering your email.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Your e-mail address" />
          <button type="button">Subscribe</button>
        </div>
        <label>
          <input type="checkbox" /> I accept the privacy policy.
        </label>
      </div>
    </div>
    <div className="footer-bar">
      <p>© {new Date().getFullYear()} SkyJet Airlines. All rights reserved.</p>
      <div className="socials">
        <span>Youtube</span>
        <span>Facebook</span>
        <span>LinkedIn</span>
        <span>Instagram</span>
        <span>X</span>
      </div>
    </div>
  </footer>
);

export default Footer;

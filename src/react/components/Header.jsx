import React from 'react';
import '../../css/header.css';

const Header = ({ activePage, onNavigate }) => (
  <header className="site-header">
    <div className="logo">SkyJet</div>
    <nav className="nav-links">
      <span>Services</span>
      <span>City Guide</span>
      <button
        type="button"
        className={activePage === 'faq' ? 'active-link' : undefined}
        onClick={() => onNavigate('faq')}
      >
        FAQ
      </button>
      <button
        type="button"
        className={activePage === 'about' ? 'active-link' : undefined}
        onClick={() => onNavigate('about')}
      >
        About
      </button>
      <button
        type="button"
        className={activePage === 'policies' ? 'active-link' : undefined}
        onClick={() => onNavigate('policies')}
      >
        Policies
      </button>
      <button
        type="button"
        className={activePage === 'contact' ? 'active-link' : undefined}
        onClick={() => onNavigate('contact')}
      >
        Contact
      </button>
      <button
        type="button"
        className={activePage === 'meals' ? 'active-link' : undefined}
        onClick={() => onNavigate('meals')}
      >
        Meal Selection
      </button>
      <button
        type="button"
        className={activePage === 'journey' ? 'active-link' : undefined}
        onClick={() => onNavigate('journey')}
      >
        Compliment Your Journey
      </button>
      <button
        type="button"
        className={activePage === 'holidays' ? 'active-link' : undefined}
        onClick={() => onNavigate('holidays')}
      >
        SkyJet Holidays
      </button>
      <button
        type="button"
        className={activePage === 'baggage' ? 'active-link' : undefined}
        onClick={() => onNavigate('baggage')}
      >
        Rules &amp; Conditions
      </button>
      <span>Campaigns</span>
    </nav>
    <div className="header-actions">
      <button className="locale-btn" type="button">
        <span role="img" aria-label="globe">🌐</span>
        EN
      </button>
      <button className="login-btn" type="button">Login</button>
    </div>
  </header>
);

export default Header;

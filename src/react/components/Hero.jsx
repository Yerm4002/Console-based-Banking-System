import React from 'react';
import '../../css/hero.css';

const Hero = () => (
  <section className="hero">
    <div className="hero-text">
      <p className="crumbs">Corporate &gt; Frequently Asked Questions</p>
      <h1>
        Frequently Asked <span>Questions</span>
      </h1>
      <p className="lead">
        Everything you need to know about planning your SkyJet journey, staying
        up to date on policies, and traveling with ease.
      </p>
      <div className="hero-cta">
        <button type="button">SkyJet Mobile App</button>
        <div className="qr-block">
          <span>Scan QR to download</span>
          <div className="qr-placeholder" aria-hidden="true"></div>
        </div>
      </div>
    </div>
    <div className="hero-card">
      <div className="card-top">
        <p className="card-label">SkyJet Mobile</p>
        <p className="card-title">Plan, manage, and track every flight.</p>
      </div>
      <div className="device-mock">
        <div className="status-bar"></div>
        <div className="screen">
          <p>Hello, where would you like to fly?</p>
          <div className="ticket">
            <p>Round trip</p>
            <p>New York ✈ Istanbul</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;

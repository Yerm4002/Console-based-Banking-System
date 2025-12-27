import React from 'react';
import '../../css/about.css';

const fleet = [
  { type: 'A321neo', count: 8, capacity: 211 },
  { type: 'A320neo', count: 6, capacity: 189 },
  { type: 'B737-8 MAX', count: 5, capacity: 176 },
  { type: 'B737-800', count: 10, capacity: 189 },
  { type: 'Embraer E195-E2', count: 4, capacity: 132 },
  { type: 'ATR 72-600', count: 3, capacity: 72 }
];

const sidebarLinks = [
  'About Us',
  'Vision & Mission',
  'Policies',
  'Flight Destinations',
  'Frequently Asked Questions',
  'Rules and Conditions',
  'Career',
  'Contact'
];

const AboutSkyJet = () => (
  <section className="about-page">
    <div className="about-hero">
      <p className="crumbs">Corporate &gt; About Us</p>
      <h1>About SkyJet</h1>
      <p>
        SkyJet was born in Sarajevo with a mission to connect every corner of Bosnia and Herzegovina with the world.
        From our humble beginnings at Sarajevo International Airport, we have grown into a digital-first airline that
        keeps the spirit of the Balkans at the heart of every flight.
      </p>
    </div>

    <div className="about-layout">
      <aside className="about-sidebar">
        {sidebarLinks.map((link) => (
          <button type="button" key={link} className={link === 'About Us' ? 'active' : ''}>
            {link}
          </button>
        ))}
      </aside>

      <article className="about-content">
        <section>
          <h2>Our Story</h2>
          <p>
            After decades of aviation heritage under various names, SkyJet emerged in 2025 as a Sarajevo-based airline
            dedicated to modern, accessible travel. Our team blends local hospitality with cutting-edge technology to
            deliver seamless journeys from the heart of the Balkans. We fly out of Sarajevo, Tuzla, Mostar, Banja Luka,
            and Bihać to more than 60 destinations, carrying the warmth of Bosnian culture with every takeoff.
          </p>
        </section>

        <section>
          <h2>Our Promise</h2>
          <ul>
            <li>Environmentally friendly fleet with efficient narrow-body aircraft.</li>
            <li>Digitally native booking experience and mobile-first support.</li>
            <li>Affordable fares for diaspora travelers and explorers alike.</li>
            <li>Community investments in Sarajevo’s aviation and tourism ecosystem.</li>
          </ul>
        </section>

        <section>
          <h2>Fleet Overview</h2>
          <div className="fleet-table">
            <div className="fleet-header">
              <span>Plane Type</span>
              <span>Plane Count</span>
              <span>Passenger Capacity</span>
            </div>
            {fleet.map((item) => (
              <div className="fleet-row" key={item.type}>
                <span>{item.type}</span>
                <span>{item.count}</span>
                <span>{item.capacity}</span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  </section>
);

export default AboutSkyJet;

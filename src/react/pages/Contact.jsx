import React from 'react';
import '../../css/contact.css';

const contacts = [
  {
    title: 'Paid Call Center',
    description: 'Ticket reservations, upgrades, voluntary reissues, partner services.',
    phone: '+387 33 728 500'
  },
  {
    title: 'Free Call Center',
    description: 'Flight status, cancellations, GDPR requests, general support.',
    phone: '+387 33 728 600'
  },
  {
    title: 'Luggage Disruption Line',
    description: 'Lost or damaged baggage notifications and delivery coordination.',
    phone: '+387 33 728 700'
  },
  {
    title: 'Operational Disruption Line',
    description: 'Schedule changes or involuntary disruptions handled 24/7.',
    phone: '+387 33 728 800'
  }
];

const Contact = () => (
  <section className="contact-page">
    <header className="contact-hero">
      <div>
        <p className="crumbs">Corporate &gt; Contact</p>
        <h1>Contact SkyJet</h1>
        <p>
          Our headquarters are based in Sarajevo, and our support teams are reachable around the clock.
          Choose the line that fits your request or email us any time.
        </p>
        <div className="contact-email">
          <span>Email</span>
          <a href="mailto:skyjet@gmail.com">skyjet@gmail.com</a>
        </div>
      </div>
      <div className="contact-map" aria-hidden="true"></div>
    </header>

    <section className="call-centers">
      <h2>Call Centers</h2>
      <div className="center-grid">
        {contacts.map((entry) => (
          <article key={entry.title} className="center-card">
            <h3>{entry.title}</h3>
            <p>{entry.description}</p>
            <a href={`tel:${entry.phone.replace(/\s/g, '')}`}>{entry.phone}</a>
          </article>
        ))}
      </div>
    </section>
  </section>
);

export default Contact;

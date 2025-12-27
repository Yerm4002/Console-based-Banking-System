import React from 'react';
import '../../css/baggage.css';

const corporateLinks = [
  'About Us',
  'Vision and Mission',
  'Policies',
  'Flight Destinations',
  'Frequently Asked Questions',
  'Rules and Conditions',
  'Career',
  'Contact'
];

const domesticFees = [
  { range: '0 – 20 kg', digital: '200 KM', airport: '220 KM' },
  { range: 'Each additional 5 kg', digital: '150 KM', airport: '165 KM' }
];

const intlFees = [
  { range: 'Europe & Middle East', digital: '95 KM', airport: '115 KM' },
  { range: 'North America', digital: '190 KM', airport: '210 KM' },
  { range: 'Far East & Australia', digital: '220 KM', airport: '250 KM' }
];

const connectingFees = [
  { range: 'International + Domestic (0 – 20 kg)', digital: '260 KM', airport: '280 KM' },
  { range: 'International + Domestic (each additional 5 kg)', digital: '180 KM', airport: '195 KM' }
];

const FeeTable = ({ title, rows }) => (
  <div className="fee-card">
    <h4>{title}</h4>
    <div className="table-header">
      <span>Excess Baggage</span>
      <span>Web + App</span>
      <span>Call Center + Airport</span>
    </div>
    {rows.map((row) => (
      <div className="table-row" key={row.range}>
        <span>{row.range}</span>
        <span>{row.digital}</span>
        <span>{row.airport}</span>
      </div>
    ))}
  </div>
);

const BaggageRules = () => (
  <section className="baggage-page">
    <div className="baggage-hero">
      <div>
        <p className="crumbs">Corporate &gt; Rules and Conditions &gt; Excess Baggage</p>
        <h1>Excess Baggage</h1>
        <p>
          SkyJet guests receive a complimentary allowance on every flight. When you
          need extra kilos, simply purchase the allowance during booking, via the SkyJet
          app, or at the airport. Fees are shown in convertible marks (KM) and apply per
          passenger and flight segment.
        </p>
      </div>
      <div className="hero-visual" aria-hidden="true"></div>
    </div>

    <div className="baggage-layout">
      <aside className="corporate-nav">
        {corporateLinks.map((link) => (
          <button
            type="button"
            key={link}
            className={link === 'Rules and Conditions' ? 'active' : undefined}
          >
            {link}
          </button>
        ))}
      </aside>

      <div className="baggage-content">
        <article>
          <h2>Excess Baggage Guidelines</h2>
          <p>
            Allowances vary by cabin package and route. Travelers without checked baggage in
            their bundle can still purchase up to 20 kg of excess allowance prior to arriving at
            the airport. Buying online through skyjet.com or the mobile application ensures the
            best rate and automatically syncs with your reservation.
          </p>
          <p>
            The service is refundable up until the flight closes, provided the allowance has
            not been used. If your journey includes multiple segments, the charge is calculated
            for each individual flight.
          </p>
        </article>

        <FeeTable title="Domestic &amp; Regional Flights" rows={domesticFees} />
        <FeeTable title="International Flights" rows={intlFees} />
        <FeeTable title="International Flights Connecting to Domestic" rows={connectingFees} />

        <article className="notes">
          <h3>Important Notes</h3>
          <ul>
            <li>Displayed prices are valid for 2025 departures and include VAT.</li>
            <li>Each passenger may purchase up to 40 kg of excess baggage in total.</li>
            <li>Musical instruments and sporting equipment may require special handling.</li>
            <li>For group bookings, please contact the SkyJet agency support desk.</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
);

export default BaggageRules;

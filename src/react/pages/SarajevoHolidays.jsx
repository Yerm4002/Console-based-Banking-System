import React from 'react';
import '../../css/holidays.css';

const featuredHotels = [
  {
    name: 'Hotel Europe Sarajevo',
    perks: ['3-night stay in Deluxe Baščaršija Room', 'Breakfast included', 'Airport transfers'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Swissôtel Sarajevo',
    perks: ['SkyJet lounge access', 'Bed and breakfast', 'Wellness & spa credit'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Malak Regency and Villas',
    perks: ['River view suite', 'Private driver', 'Complimentary Bosnian dinner'],
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
  }
];

const reasons = [
  'Unrivalled selection of Sarajevo boutique and luxury hotels',
  'Bosnian breakfast and local craft tours bundled in every stay',
  'Earn SkySmiles points on hotel + flight bookings',
  'Dedicated Sarajevo holiday concierge 24/7'
];

const SarajevoHolidays = () => (
  <section className="holidays-page">
    <header className="holidays-hero">
      <div className="hero-text">
        <h1>SkyJet Holidays</h1>
        <p>
          Combine flights and handpicked accommodation in the heart of Bosnia and Herzegovina. Explore
          Baščaršija, relax at Ilidža thermal springs, and ride the Trebević cable car with curated SkyJet packages.
        </p>
        <div className="hero-search">
          <div>
            <label>From</label>
            <input type="text" defaultValue="Dubai (DXB)" />
          </div>
          <div>
            <label>Destination</label>
            <input type="text" defaultValue="Sarajevo (SJJ)" />
          </div>
          <div>
            <label>Departure</label>
            <input type="date" />
          </div>
          <div>
            <label>Return</label>
            <input type="date" />
          </div>
          <div>
            <label>Guests</label>
            <input type="text" defaultValue="2 Guests, 1 Room" />
          </div>
          <button type="button">Search</button>
        </div>
      </div>
      <div className="hero-image" aria-hidden="true"></div>
    </header>

    <section className="offers">
      <div className="offer-card">
        <span className="badge">Sarajevo Stopover</span>
        <h2>Turn your layover into two trips</h2>
        <p>
          Add a 48-hour Sarajevo stopover to any SkyJet itinerary and enjoy guided tours, cable-car tickets,
          and priority museum access.
        </p>
        <button type="button">Book now</button>
      </div>
      <div className="offer-card">
        <span className="badge">Winter Escape</span>
        <h2>Moutain retreats in Jahorina &amp; Bjelašnica</h2>
        <p>Save up to 25% on slope-side hotels with lift passes and equipment rental.</p>
        <button type="button">Explore offers</button>
      </div>
    </section>

    <section className="featured">
      <h2>Featured Sarajevo Hotels</h2>
      <div className="hotel-grid">
        {featuredHotels.map((hotel) => (
          <article className="hotel-card" key={hotel.name}>
            <div
              className="hotel-image"
              style={{ backgroundImage: `url(${hotel.image})` }}
            ></div>
            <div className="hotel-body">
              <h3>{hotel.name}</h3>
              <ul>
                {hotel.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <button type="button">View package</button>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="reasons">
      <h2>Why book SkyJet Holidays in Sarajevo?</h2>
      <div className="reason-cards">
        {reasons.map((reason) => (
          <div className="reason-card" key={reason}>
            <p>{reason}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="subscribe">
      <div>
        <h2>Never miss an offer</h2>
        <p>Subscribe for Sarajevo-only deals on boutique stays, cultural tours, and winter breaks.</p>
      </div>
      <form>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Preferred city of departure" />
        <label>
          <input type="checkbox" /> I agree to receive SkyJet Sarajevo Holiday offers.
        </label>
        <button type="submit">Subscribe</button>
      </form>
    </section>
  </section>
);

export default SarajevoHolidays;

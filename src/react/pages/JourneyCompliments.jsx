import React from 'react';
import '../../css/journey.css';

const sections = [
  {
    title: 'Stay connected with an eSIM',
    body:
      'Enjoy connections across more than 150 countries without a physical SIM swap. All you need to do is purchase an eSIM via Manage booking, starting at USD 10 for 1GB of data. With simple activation by scanning a QR code, you’ll be connected from the moment you land. Plans are valid for up to 30 days, giving you ample time to get in touch with loved ones, take care of business, and more.',
    button: 'Purchase now',
    image: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Need extra baggage?',
    body:
      'Carry your travel essentials and more. Save up to 20% when you purchase extra baggage online or through our mobile app.',
    button: 'Purchase extra baggage',
    image: 'https://images.unsplash.com/photo-1526481280695-3c4697c02eae?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'If your transit in Sarajevo is between 4-12 hours',
    body:
      'Turn your transit into an unforgettable stroll through Sarajevo. Book a layover tour to explore Baščaršija, Trebević cable car, or experience a quick escape to the surrounding mountains.',
    button: 'Book a Sarajevo tour',
    image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Your perfect hotel or holiday package in Bosnia and Herzegovina',
    body:
      'Save up to 30% when you book your stay or tailor-made holiday in Sarajevo, Mostar, or the Adriatic coast with SkyJet Holidays. Choose from boutique guesthouses to luxury riverside hotels.',
    button: 'Explore Bosnia hotels',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80'
  }
];

const JourneyCompliments = () => (
  <section className="journey-page">
    <header className="journey-hero">
      <div>
        <p className="crumbs">Services &gt; Compliment Your Journey</p>
        <h1>Compliment Your Journey</h1>
        <p>
          Extend the SkyJet experience with curated add-ons inspired by Bosnia and Herzegovina’s
          natural wonders. Keep in touch, travel lighter, and turn every layover into an adventure.
        </p>
      </div>
      <div className="journey-hero-image" aria-hidden="true"></div>
    </header>

    <div className="journey-sections">
      {sections.map((section, index) => (
        <article
          className={index % 2 ? 'journey-block reverse' : 'journey-block'}
          key={section.title}
        >
          <div className="journey-text">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            <button type="button">{section.button}</button>
          </div>
          <div
            className="journey-image"
            style={{ backgroundImage: `url(${section.image})` }}
          />
        </article>
      ))}
    </div>
  </section>
);

export default JourneyCompliments;

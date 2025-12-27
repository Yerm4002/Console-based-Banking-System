import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FaqSection from './components/FaqSection';
import BaggageRules from './pages/BaggageRules';
import MealSelection from './pages/MealSelection';
import JourneyCompliments from './pages/JourneyCompliments';
import SarajevoHolidays from './pages/SarajevoHolidays';
import AboutSkyJet from './pages/AboutSkyJet';
import Policies from './pages/Policies';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import '../css/global.css';

const App = () => {
  const [activePage, setActivePage] = useState('faq');

  const renderPage = () => {
    switch (activePage) {
      case 'faq':
        return (
          <>
            <Hero />
            <FaqSection />
          </>
        );
      case 'meals':
        return <MealSelection />;
      case 'baggage':
        return <BaggageRules />;
      case 'journey':
        return <JourneyCompliments />;
      case 'holidays':
        return <SarajevoHolidays />;
      case 'about':
        return <AboutSkyJet />;
      case 'policies':
        return <Policies />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero />
            <FaqSection />
          </>
        );
    }
  };

  return (
    <div className="app-shell">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default App;

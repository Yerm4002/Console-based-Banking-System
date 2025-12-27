import React, { useState } from 'react';
import CategoryTabs from './CategoryTabs';
import FaqAccordion from './FaqAccordion';
import { categories, faqs } from '../data/faqData';
import '../../css/faq.css';

const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  return (
    <section className="faq-section">
      <div className="faq-layout">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <FaqAccordion
          key={activeCategory}
          items={faqs[activeCategory]}
        />
      </div>
    </section>
  );
};

export default FaqSection;

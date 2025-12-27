import React, { useState } from 'react';

const FaqAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <article className="accordion-item" key={item.question}>
          <header>
            <button type="button" onClick={() => toggleItem(index)}>
              <span>{item.question}</span>
              <span className="indicator">{openIndex === index ? '−' : '+'}</span>
            </button>
          </header>
          {openIndex === index && <p>{item.answer}</p>}
        </article>
      ))}
    </div>
  );
};

export default FaqAccordion;

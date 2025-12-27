import React from 'react';
import '../../css/policies.css';

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

const policySections = [
  {
    heading: 'Our Quality Policy',
    paragraphs: [
      'As SkyJet Sarajevo Airways, our goal is to manage every service in line with Bosnian, regional, and international aviation regulations. We prioritize customer satisfaction and continuous improvement across all operations thanks to our locally built quality management system.',
      'We listen to diaspora travelers, corporate partners, and first-time visitors to Bosnia, shaping services that stay authentic to our roots while meeting the expectations of a global audience.'
    ],
    bullets: [
      'Customer focus through ongoing feedback loops with passengers and partners.',
      'Leadership and employee engagement programs led from our Sarajevo HQ.',
      'Continuous improvement culture driven by digital analytics and crew training.',
      'Risk and opportunity assessments for every new route or seasonal service.'
    ]
  },
  {
    heading: 'Our Security Policy',
    paragraphs: [
      'SkyJet commits to protecting passengers, crew, and operations in every environment we serve. Security protocols are coordinated with Bosnian authorities and EASA guidelines to prevent unlawful interference both on the ground and in flight.',
      'All employees receive regular scenario-based training in Sarajevo, Tuzla, and Banja Luka to keep response skills sharp and community-focused.'
    ],
    bullets: [
      'Dedicated security responsibilities defined for each station and shift.',
      'Vulnerability assessments conducted quarterly with local airport partners.',
      'Rapid information sharing between operations, safety, and customer care teams.',
      'Transparent reporting system that encourages staff to speak up without fear.'
    ]
  },
  {
    heading: 'Compliance Policy',
    paragraphs: [
      'We uphold Bosnian civil aviation laws, EU standards, and ICAO regulations. Our compliance monitoring system ensures every SkyJet process—from maintenance to catering—is audited and improved continually.',
      'The Sarajevo-based compliance unit leads annual programs, integrates customer feedback, and coordinates corrective actions with senior management.'
    ],
    bullets: [
      'Annual compliance monitoring program with documented follow-ups.',
      'Promotion of a culture of fairness and open communication between management and crew.',
      'Provision of top-level communication channels for timely escalation of issues.',
      'Effectiveness reviews to confirm that corrective actions deliver measurable safety gains.'
    ]
  },
  {
    heading: 'Our Safety Policy',
    paragraphs: [
      'Safety is the foundation of SkyJet. Senior leadership in Sarajevo commits to a Safety Management System that meets national and international standards while respecting the human factors unique to Balkan operations.',
      'All team members—pilots, cabin crew, technicians, and airport partners—share accountability for maintaining and improving safety performance.'
    ],
    bullets: [
      'Provide the personnel, financial resources, and tools necessary to support this policy.',
      'Define clear authorities and responsibilities for each safety-critical role.',
      'Deliver continuous training with emphasis on situational awareness and resilience.',
      'Encourage fair reporting and protect employees who highlight risks or incidents.'
    ]
  }
];

const Policies = () => (
  <section className="policies-page">
    <div className="policies-hero">
      <p className="crumbs">Corporate &gt; Policies</p>
      <h1>Policies</h1>
      <p>
        SkyJet was founded in Bosnia and Herzegovina to bring modern aviation to the region. Our policies reflect
        Sarajevo’s mix of tradition and innovation, ensuring every flight is safe, secure, and customer-centric.
      </p>
    </div>

    <div className="policies-layout">
      <aside className="policies-sidebar">
        {sidebarLinks.map((link) => (
          <button type="button" key={link} className={link === 'Policies' ? 'active' : ''}>
            {link}
          </button>
        ))}
      </aside>

      <article className="policies-content">
        {policySections.map((section) => (
          <section key={section.heading} className="policy-block">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>
        ))}
      </article>
    </div>
  </section>
);

export default Policies;

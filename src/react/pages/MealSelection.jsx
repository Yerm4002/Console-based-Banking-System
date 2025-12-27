import React from 'react';
import '../../css/meals.css';

const mealOptions = [
  {
    name: 'Sarajevo Cevapi Feast',
    description:
      'Grilled beef links served with somun bread, kajmak, and pickled peppers straight from Bascarsija.',
    features: ['Halal friendly', 'High protein', 'Available on flights 4h+'],
    image:
      'https://piovariations.cdn.podravka.net/1eccd25e-f5c0-11ef-867a-d60fe2f78059/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp'
  },
  {
    name: 'Slow-Cooked Sarma',
    description:
      'Cabbage rolls stuffed with minced meat and rice, simmered in tomato broth and served with creamy polenta.',
    features: ['Comfort meal', 'Gluten friendly option'],
    image: 'https://gastrokutak.com/wp-content/uploads/2025/04/domaca-sarma.jpg'
  },
  {
    name: 'Classic Burek Box',
    description:
      'Golden spirals of phyllo pastry filled with seasoned beef, yogurt dip, and roasted ajvar.',
    features: ['Warm snack', 'Vegetarian option available'],
    image: 'https://www.nkp.ba/wp-content/uploads/2024/11/burek-111.jpg'
  },
  {
    name: 'Sogan Dolma Set',
    description:
      'Stuffed onions with minced veal, dill yogurt, and herb rice pilaf inspired by northern Bosnia.',
    features: ['Low carb', 'Served with salad'],
    image:
      'https://bakinghermann.com/wp-content/uploads/2025/07/65b1b9f0-1fd9-4299-a012-058d87d9bc8e_1080x1350.jpg'
  },
  {
    name: 'Tufahija Dessert Duo',
    description:
      'Baked apples filled with walnuts and whipped cream, paired with rose syrup.',
    features: ['Dessert course', 'Contains nuts'],
    image: 'https://furaj.ba/wp-content/uploads/2022/10/tufahija_tufahije_depositphotos-scaled.jpg'
  },
  {
    name: 'Bosnian Coffee Ritual',
    description:
      'Copper dzezva service with rahat lokum and dark chocolate square to end the meal the traditional way.',
    features: ['Beverage service', 'Add-on only'],
    image:
      'https://www.asholding.ba/wp-content/uploads/2022/06/pecena-tamno2-copy-e1655118395735.jpg'
  }
];

const MealCard = ({ meal }) => (
  <article className="meal-card">
    <div className="meal-image" style={{ backgroundImage: `url(${meal.image})` }} />
    <div className="meal-body">
      <h3>{meal.name}</h3>
      <p>{meal.description}</p>
      <ul>
        {meal.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button type="button">Preorder</button>
    </div>
  </article>
);

const MealSelection = () => (
  <section className="meals-page">
    <header className="meals-hero">
      <div>
        <p className="crumbs">Services &gt; SkyJet Cafe</p>
        <h1>Meal Selection</h1>
        <p>
          Discover Bosnian favorites crafted for cruising altitude. Every SkyJet Cafe menu is chef-curated
          and available to preorder up to 24 hours before departure.
        </p>
        <div className="hero-actions">
          <button type="button">View Menus</button>
          <button type="button" className="ghost">Download PDF</button>
        </div>
      </div>
      <div className="hero-photo" aria-hidden="true"></div>
    </header>

    <div className="meal-grid">
      {mealOptions.map((meal) => (
        <MealCard meal={meal} key={meal.name} />
      ))}
    </div>
  </section>
);

export default MealSelection;

import Storage from './storage';
import API from './articleFetch';

export default class Accordion {
  // Controls which accordions are shown
  static accordionShower() {
    const settingsArray = Storage.loadFromStorage('settings');
    const accordions = document.querySelectorAll('.accordion');

    settingsArray.forEach((obj, index) => {
      if (obj.checked) {
        accordions[index].classList.remove('hidden');
      } else {
        accordions[index].classList.add('hidden');
      }
    });
  }

  // Loads content once when clicked for each accodion
  static accordionContent() {
    const accordions = document.querySelectorAll('.accordion');

    // When accordion is clicked i check if it has been clicked before
    // If not it runs appendData and marks the accordion as clicked
    function handleAccordionClick(accordion, searchFunction) {
      if (accordion.dataset.hasBeenClicked === 'true') return;
      appendData(accordion, searchFunction);
      accordion.dataset.hasBeenClicked = 'true';
    }

    // Gets the articles and appends every article in the accordion body
    async function appendData(accordion, searchFunction) {
      const accordionBody = document.querySelector(
        `[data-query="${accordion.dataset.query}"] .accordion-body`
      );
      const articles = await searchFunction();
      articles.response.docs.forEach((article) => {
        const newArticle = document.createElement('article');
        newArticle.classList.add('border-bottom', 'py-3', 'px-4');
        newArticle.innerHTML = `
        <h3 class="card-title">${article.headline.main}</h3>
        <p class="card-subtitle">${article.abstract}</p>
      `;
        accordionBody.appendChild(newArticle);
      });
    }

    accordions.forEach((accordion) => {
      accordion.dataset.hasBeenClicked = 'false';
      accordion.addEventListener('click', () => {
        switch (accordion.dataset.query) {
          case 'europe':
            handleAccordionClick(accordion, API.searchArticlesEurope);
            break;
          case 'health':
            handleAccordionClick(accordion, () => API.searchArticles('news_desk', 'health'));
            break;
          case 'sport':
            handleAccordionClick(accordion, () => API.searchArticles('news_desk', 'sports'));
            break;
          case 'business':
            handleAccordionClick(accordion, () => API.searchArticles('news_desk', 'business'));
            break;
          case 'travel':
            handleAccordionClick(accordion, () => API.searchArticles('news_desk', 'travel'));
            break;
          case 'popular':
            handleAccordionClick(accordion, API.topArticles);
            break;
          default:
            break;
        }
      });
    });
  }

  static run() {
    this.accordionShower();
    this.accordionContent();
  }
}

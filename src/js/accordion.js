import autoAnimate from '@formkit/auto-animate'
import Storage from './storage'
import API from './articleFetch'
import Touch from './touch'
import Hash from './hash'
import { animate } from 'motion'

export default class Accordion {
  // Controls which accordions are shown
  static accordionShower() {
    const settingsArray = Storage.loadFromStorage('settings')
    const accordions = document.querySelectorAll('.container-main .accordion')

    settingsArray.forEach((obj, index) => {
      if (obj.checked) {
        accordions[index].classList.remove('hidden')
      } else {
        accordions[index].classList.add('hidden')
      }
    })
  }

  static emptyArchiveAccordions() {
    const accordions = document.querySelectorAll('#offcanvasLeft .accordion-body')
    accordions.forEach((accordion) => {
      accordion.innerHTML = ''
    })
  }

  // Loads content once when clicked for each accodion
  static accordionContent() {
    const accordions = document.querySelectorAll('.container-main .accordion')

    // When accordion is clicked i check if it has been clicked before
    // If not it runs appendData and marks the accordion as clicked
    async function handleAccordionClick(accordion, searchFunction) {
      function accordionSpinnerShow(accordion) {
        const accordionBody = accordion.querySelector('.accordion-body')
        const newSpinner = document.createElement('div')
        newSpinner.classList.add('d-flex', 'justify-content-center', 'spinner')
        newSpinner.innerHTML = `
        <div class="spinner-border text-primary m-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        `
        accordionBody.appendChild(newSpinner)
      }

      function accordionSpinnerHide(accordion) {
        const spinner = accordion.querySelector('.spinner')
        spinner.remove()
      }

      if (accordion.dataset.hasBeenClicked === 'true') return
      accordionSpinnerShow(accordion)
      await appendData(accordion, searchFunction)
      accordion.dataset.hasBeenClicked = 'true'
      accordions.forEach((accordion) => {
        const accordionBody = accordion.querySelector('.accordion-body')
        autoAnimate(accordionBody)
      })
      accordionSpinnerHide(accordion)
      Touch.run('main')
    }

    // Gets the articles and appends every article in the accordion body
    async function appendData(accordion, searchFunction) {
      const accordionBody = document.querySelector(
        `[data-query="${accordion.dataset.query}"] .accordion-body`
      )
      const articles = await searchFunction()

      if (accordion.dataset.query === 'popular') {
        articles.results.forEach((article) => {
          const newArticle = document.createElement('article')
          newArticle.classList.add('border-bottom')
          newArticle.innerHTML = `
          <a class="accordion-article px-4 py-3" target="_blank" href="${article.url}">
            <img class="rounded-circle object-fit-fill" src="${
              article.media[0]?.['media-metadata'][0].url
                ? article.media[0]?.['media-metadata'][0].url
                : './assets/icons/TwemojiNewspaper.svg'
            }" alt="Thumbnail for article"></img>
            <div>
              <h3 class="card-title">${article.title}</h3>
              <p class="card-subtitle">${article.abstract}</p>
            </div>
          </a>
          <div class="accordion-article-swipeleft">
            <img src="./assets/icons/OcticonInbox16.svg" alt="Archieve icon"></img>
          </div>
        `
          if (Hash.findHash(newArticle)) {
            accordionBody.appendChild(newArticle)
          }
        })
      } else {
        articles.response.docs.forEach((article) => {
          const newArticle = document.createElement('article')
          newArticle.classList.add('border-bottom')
          newArticle.innerHTML = `
          <a class="accordion-article px-4 py-3" target="_blank" href="${article.web_url}">
            <img class="rounded-circle object-fit-fill" src="${
              article.multimedia[17]?.url
                ? `https://www.nytimes.com/${article.multimedia[17]?.url}`
                : './assets/icons/TwemojiNewspaper.svg'
            }" alt="Thumbnail for article"></img>
            <div>
              <h3 class="card-title">${article.headline.main}</h3>
              <p class="card-subtitle">${article.abstract}</p>
            </div>
          </a>
          <div class="accordion-article-swipeleft">
            <img src="./assets/icons/OcticonInbox16.svg" alt="Archieve icon"></img>
          </div>
        `
          if (Hash.findHash(newArticle)) {
            accordionBody.appendChild(newArticle)
          }
        })
      }
    }

    accordions.forEach((accordion) => {
      accordion.dataset.hasBeenClicked = 'false'
      accordion.addEventListener('click', async () => {
        switch (accordion.dataset.query) {
          case 'europe':
            await handleAccordionClick(accordion, API.searchArticlesEurope)
            break
          case 'health':
            await handleAccordionClick(accordion, () => API.searchArticles('news_desk', 'health'))
            break
          case 'sport':
            await handleAccordionClick(accordion, () => API.searchArticles('news_desk', 'sports'))
            break
          case 'business':
            await handleAccordionClick(accordion, () => API.searchArticles('news_desk', 'business'))
            break
          case 'travel':
            await handleAccordionClick(accordion, () => API.searchArticles('news_desk', 'travel'))
            break
          case 'popular':
            await handleAccordionClick(accordion, API.topArticles)
            break
          default:
            break
        }
      })
    })
  }

  static run() {
    this.accordionShower()
    this.accordionContent()
  }
}

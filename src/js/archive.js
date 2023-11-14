import Storage from './storage'

export default class Archive {
  static articleArchive(article) {
    let archiveArray = Storage.loadFromStorage('archive') || []
    const articleObject = {
      subject:
        article.parentElement.parentElement.parentElement.parentElement
          .parentElement.dataset.query,
      html: this.articleCleaner(article.parentElement.outerHTML),
    }
    archiveArray.push(articleObject)
    Storage.saveToStorage('archive', archiveArray)
    article.parentElement.remove()
    this.loadArchive()
  }

  static loadArchive() {
    const accordions = document.querySelectorAll('.offcanvas .accordion')
    const archiveArray = Storage.loadFromStorage('archive') ?? []

    for (const accordion of accordions) {
      const accordionQuery = accordion.dataset.query
      for (const obj of archiveArray) {
        if (obj.subject === accordionQuery) {
          const newArticle = document.createElement('article')
          const accordionBody = accordion.querySelector('.accordion-body')
          newArticle.classList.add('border-bottom')
          newArticle.innerHTML = obj.html
          accordionBody.appendChild(newArticle)
          break
        }
      }
    }
  }

  static articleCleaner(article) {
    const parser = new DOMParser()
    const parsedHTML = parser.parseFromString(article, 'text/html')

    const elementsWithStyles = parsedHTML.querySelectorAll('[style]')
    elementsWithStyles.forEach((element) => {
      element.removeAttribute('style')
    })

    return parsedHTML.documentElement.outerHTML
  }

  static deleteArticleArchive() {}

  static run() {
    this.loadArchive()
  }
}

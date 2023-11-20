import Accordion from './accordion'
import API from './articleFetch'

export default class Searchbar {
  static async search() {
    const input = document.querySelector('#article-search')
    const data = await API.searchArticlesSpecific(`${input.value}`)
    console.log(data)
    Accordion.accordionSearch(data)
  }

  static searchEvents() {
    const input = document.querySelector('#article-search')
    const inputBtn = document.querySelector('.article-search-btn')

    inputBtn.addEventListener('click', () => {
      this.search()
    })

    input.addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') return
      this.search()
    })
  }

  static run() {
    this.searchEvents()
  }
}

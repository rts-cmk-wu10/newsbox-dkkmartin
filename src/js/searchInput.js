import API from './articleFetch'

export default class Searchbar {
  static async search() {
    const input = document.querySelector('#article-search')
    const data = await API.searchArticlesSpecific(`${input.value}`)
    console.log(data)
  }

  static searchEvents() {
    const input = document.querySelector('#article-search')
    input.addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') return
      this.search()
    })
  }

  static run() {
    this.searchEvents()
  }
}

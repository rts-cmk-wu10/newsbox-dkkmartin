import anime from 'animejs'
import Accordion from './accordion'
import API from './articleFetch'

export default class Searchbar {
  static async search() {
    const input = document.querySelector('#article-search')
    const data = await API.searchArticlesSpecific(`${input.value}`)
    Accordion.accordionSearch(data)
  }

  static searchEvents() {
    const input = document.querySelector('#article-search')
    const inputBtn = document.querySelector('.article-search-btn')

    inputBtn.addEventListener('click', () => {
      this.search()
      this.searchSpinnerStart()
    })

    input.addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') return
      this.search()
      this.searchSpinnerStart()
    })
  }

  static searchSpinnerStart() {
    const tl = anime.timeline({
      easing: 'easeOutSine',
      duration: 200,
    })
    tl.add({
      targets: '#search-glass',
      translateY: -35,
    }).add({
      targets: '#search-spinner',
      translateY: [35, 0],
    })
  }

  static run() {
    this.searchEvents()
  }
}

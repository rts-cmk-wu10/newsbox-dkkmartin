import anime from 'animejs'
import Accordion from './accordion'
import API from './api'

export default class Searchbar {
  static async search() {
    const input = document.querySelector('#article-search')
    const data = await API.searchArticlesSpecific(`${input.value}`)
    if (data === null) return
    Accordion.accordionSearch(data)
    this.searchSpinnerStop()
  }

  static searchEvents() {
    const input = document.querySelector('#article-search')
    const inputBtn = document.querySelector('.article-search-btn')

    inputBtn.addEventListener('click', () => {
      this.searchSpinnerStart()
      this.search()
    })

    input.addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') return
      this.searchSpinnerStart()
      this.search()
    })
  }

  static searchSpinnerStart() {
    const tl = anime.timeline({
      easing: 'easeOutSine',
      duration: 50,
    })
    tl.add({
      targets: '#search-glass',
      translateY: [0, -35],
    }).add({
      targets: '#search-spinner',
      translateY: [0, -43],
    })
  }

  static searchSpinnerStop() {
    const tl = anime.timeline({
      easing: 'easeOutSine',
      duration: 50,
    })
    tl.add({
      targets: '#search-glass',
      translateY: [-35, 0],
    }).add({
      targets: '#search-spinner',
      translateY: [-43, 0],
    })
  }

  static run() {
    this.searchEvents()
  }
}

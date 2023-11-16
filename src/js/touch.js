import Archive from './archive'

export default class Touch {
  static touchSwipe(selector) {
    const articles = document.querySelectorAll(`${selector} .accordion-article`)

    let initialX, initialY, animationFrame
    articles.forEach((article) => {
      article.addEventListener('touchstart', (e) => {
        initialX = e.touches[0].clientX
        initialY = e.touches[0].clientY
      })

      article.addEventListener('touchmove', (e) => {
        const deltaX = e.touches[0].clientX - initialX
        const maxSlideLeft = -140
        const translatedX = Math.max(deltaX, maxSlideLeft)

        // Only allow swipe to the left
        if (translatedX < 0) {
          article.style.transform = `translateX(${translatedX}px)`
          article.nextElementSibling.style.transform = `translateX(${translatedX}px)`
        }
      })

      article.addEventListener('touchend', (e) => {
        var deltaX = e.changedTouches[0].clientX - initialX
        var deltaY = Math.abs(e.changedTouches[0].clientY - initialY)

        if (deltaX <= -150 && deltaY <= 150) {
          this.swipeLeft(article)
        } else {
          this.resetTransform(article)
          cancelAnimationFrame(animationFrame)
        }

        animationFrame = requestAnimationFrame(() => {
          article.style.transition = ''
          article.nextElementSibling.style.transition = ''
        })
      })
    })
  }

  static swipeLeft(article) {
    article.style.transition = 'transform 0.3s ease-in-out'
    article.style.transform = 'translateX(-35%)'
    article.nextElementSibling.style.transition = 'transform 0.3s ease-in-out'
    article.nextElementSibling.style.transform = 'translateX(-100%)'
    if (article.nextElementSibling.classList.contains('accordion-article-swipeleft')) {
      Archive.articleArchive(article)
    } else {
      Archive.archiveDeleter(article)
      article.parentElement.remove()
    }
  }

  static resetTransform(article) {
    article.style.transition = 'transform 0.3s ease-in-out'
    article.nextElementSibling.style.transition = 'transform 0.3s ease-in-out'
    article.style.transform = 'translateX(0)'
    article.nextElementSibling.style.transform = 'translateX(0)'
  }

  static run(selector) {
    this.touchSwipe(selector)
  }
}

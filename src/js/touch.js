export default class Touch {
  static touchSwipe() {
    const articles = document.querySelectorAll('.accordion-article');

    var initialX, initialY, initialTime;
    articles.forEach((article) => {
      article.addEventListener('touchstart', (e) => {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
        initialTime = new Date();
      });

      article.addEventListener('touchend', (e) => {
        var deltaX = e.changedTouches[0].clientX - initialX;
        var deltaY = Math.abs(e.changedTouches[0].clientY - initialY);
        var deltaTime = new Date() - initialTime;

        if (deltaX <= -30 && deltaY <= 100 && deltaTime <= 300) {
          this.swipeLeft(article, e);
        } else if (deltaX >= 30 && deltaY <= 100 && deltaTime <= 300) {
          this.swipeRight(article, e);
        }
      });
    });
  }

  static swipeLeft(article, e) {
    article.style.transition = 'transform 0.3s ease-in-out';
    article.style.transform = 'translateX(-35%)';
  }

  static swipeRight(article, e) {
    article.style.transition = 'transform 0.3s ease-in-out';
    article.style.transform = 'translateX(0)';
  }

  static run() {
    this.touchSwipe();
  }
}

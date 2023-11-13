import Storage from './storage';

export default class Archive {
  static articleArchive(article) {
    if (!Storage.loadFromStorage('archive')) {
      const archiveArray = [];
      const articleHTML = article.outerHTML;
      archiveArray.push(articleHTML);
      Storage.saveToStorage('archive', archiveArray);
    } else {
      const localArchive = Storage.loadFromStorage('archive');
      const articleHTML = article.outerHTML;
      localArchive.push(articleHTML);
      Storage.saveToStorage('archive', localArchive);
    }
    article.parentElement.remove();
  }
}

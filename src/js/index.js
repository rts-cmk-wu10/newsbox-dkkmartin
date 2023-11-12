import Storage from './storage';

export default class Index {
  static accordionHandler() {
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

  static run() {
    this.accordionHandler();
  }
}

export default class Storage {
  static saveToStorage(name, content) {
    if (localStorage.getItem(name)) {
      this.modifyStorage(name, content);
    } else {
      const stringContent = JSON.stringify(content);
      localStorage.setItem(name, stringContent);
    }
  }

  static modifyStorage(name, content) {}

  static loadFromStorage(name) {
    const content = JSON.parse(localStorage.getItem(name));
    return content;
  }
}

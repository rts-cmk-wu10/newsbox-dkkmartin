export default class Storage {
  static saveToStorage(name, content) {
    const stringContent = JSON.stringify(content);
    localStorage.setItem(name, stringContent);
  }

  static loadFromStorage(name) {
    if (!localStorage.getItem(name)) return;
    const content = JSON.parse(localStorage.getItem(name));
    return content;
  }
}

export function saveToStorage(name, content) {
  const stringContent = JSON.stringify(content);
  localStorage.setItem(name, stringContent);
}

export function modifyStorage() {}

export function loadFromStorage() {}

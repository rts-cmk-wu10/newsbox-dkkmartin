import Storage from './storage'

export default class Hash {
  // Creates a unique identifier for an article
  static makeHash(s) {
    var hash = 0
    if (s.length == 0) {
      return hash
    }
    for (var i = 0; i < s.length; i++) {
      var char = s.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }
    return hash
  }

  // Saves a hash to localstorage, but never the same hash
  static saveArticleHash(article) {
    let hashSet = new Set(Storage.loadFromStorage('hashes') || [])
    const hash = this.makeHash(article)
    if (!hashSet.has(hash)) {
      hashSet.add(hash)
      Storage.saveToStorage('hashes', Array.from(hashSet))
    }
    return hash
  }

  // Checks if an article hash is in the localstorage
  static findHash(article) {
    if (!Storage.loadFromStorage('hashes')) return true
    let hashSet = new Set(Storage.loadFromStorage('hashes'))
    const hash = this.makeHash(article.firstElementChild.outerHTML)
    if (hashSet.has(hash)) {
      return true
    } else {
      return false
    }
  }

  static deleteHash(hash) {
    let hashSet = new Set(Storage.loadFromStorage('hashes'))
    if (hashSet.has(hash)) {
      hashSet.delete(hash)
    }
    Storage.saveToStorage('hashes', Array.from(hashSet))
  }
}

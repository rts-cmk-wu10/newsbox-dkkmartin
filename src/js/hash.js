import Storage from './storage'

export default class Hash {
  static makeHash(string) {
    var hash = 0,
      i,
      chr
    if (string.length === 0) return hash
    for (i = 0; i < string.length; i++) {
      chr = string.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0 // Convert to 32bit integer
    }
    return hash
  }

  static saveArticleHash(article) {
    let hashSet = new Set(Storage.loadFromStorage('hashes') || [])
    const hash = this.makeHash(article)
    if (!hashSet.has(hash)) {
      hashSet.add(hash)
      Storage.saveToStorage('hashes', Array.from(hashSet))
      console.log('Saved new hash: ', hash)
    }
    return hash
  }

  static findHash(article) {
    if (!Storage.loadFromStorage('hashes')) return true
    let hashSet = new Set(Storage.loadFromStorage('hashes'))
    const hash = this.makeHash(article.firstElementChild.outerHTML)
    if (hashSet.has(hash)) {
      console.log('The article is in the array')
      return false
    } else {
      console.log('The article is not in the array')
      return true
    }
  }
}

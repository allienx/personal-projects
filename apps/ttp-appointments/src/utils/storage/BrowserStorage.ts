export default class BrowserStorage {
  storage: Storage

  constructor(storageInstance: Storage) {
    this.storage = storageInstance
  }

  get(key: string) {
    try {
      const str = this.storage.getItem(key)

      return str ? JSON.parse(str) : null
    } catch (err) {
      return null
    }
  }

  save(key: string, value: string | object | []) {
    try {
      const strValue = JSON.stringify(value)

      this.storage.setItem(key, strValue)

      return true
    } catch (err) {
      return false
    }
  }

  remove(key: string) {
    try {
      this.storage.removeItem(key)

      return true
    } catch (err) {
      return false
    }
  }

  clear() {
    try {
      this.storage.clear()

      return true
    } catch (err) {
      return false
    }
  }
}

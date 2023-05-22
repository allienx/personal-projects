export default function hasStorage(type: 'localStorage' | 'sessionStorage') {
  try {
    const storage = window[type]
    const test = '_storagetest'

    storage.setItem(test, test)
    storage.removeItem(test)

    return true
  } catch (err) {
    return false
  }
}

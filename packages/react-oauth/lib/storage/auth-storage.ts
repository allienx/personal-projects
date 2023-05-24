import BrowserStorage from './browser-storage'
import hasStorage from './has-storage'

export interface AuthStorageState {
  atk: string
  rtk: string | null
  exp: string
}

const key = 'YWxsaWVueC1hdXRo'

class AuthStorage {
  browserStorage: BrowserStorage

  constructor() {
    this.browserStorage = new BrowserStorage(
      hasStorage('localStorage') ? localStorage : sessionStorage,
    )
  }

  getData(): AuthStorageState | null {
    const data = this.browserStorage.get(key)
    const isValid = !!data?.atk && !!data?.rtk && !!data.exp

    return isValid ? (data as AuthStorageState) : null
  }

  saveData(newData: Partial<AuthStorageState>) {
    const data = this.getData()

    return this.browserStorage.save(key, {
      ...data,
      ...newData,
    })
  }

  clearData() {
    return this.browserStorage.remove(key)
  }
}

const authStorage = new AuthStorage()

export default authStorage

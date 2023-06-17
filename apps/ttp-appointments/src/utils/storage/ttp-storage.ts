import { uniqBy } from 'lodash'
import BrowserStorage from 'react-oauth/lib/storage/browser-storage'
import hasStorage from 'react-oauth/lib/storage/has-storage'
import { TtpLocation } from 'src/models/ttp-location/ttp-location'

enum TtpStorageKeys {
  Root = 'ttp-storage',
  Locations = 'locations',
}

class TtpStorage {
  browserStorage: BrowserStorage

  constructor() {
    this.browserStorage = new BrowserStorage(
      hasStorage('localStorage') ? localStorage : sessionStorage,
    )
  }

  getRootData() {
    return this.browserStorage.get(TtpStorageKeys.Root) || {}
  }

  getRecentLocations() {
    const rootData = this.getRootData()

    return (rootData[TtpStorageKeys.Locations] || []) as TtpLocation[]
  }

  saveRecentLocation(ttpLocation: TtpLocation) {
    const rootData = this.getRootData()

    const locations = uniqBy(
      [ttpLocation, ...this.getRecentLocations()],
      (apptLoc) => apptLoc.id,
    )

    this.browserStorage.save(TtpStorageKeys.Root, {
      ...rootData,
      [TtpStorageKeys.Locations]: locations,
    })
  }

  clearRecentLocations() {
    const rootData = this.getRootData()

    this.browserStorage.save(TtpStorageKeys.Root, {
      ...rootData,
      [TtpStorageKeys.Locations]: [],
    })
  }
}

const ttpStorage = new TtpStorage()

export default ttpStorage

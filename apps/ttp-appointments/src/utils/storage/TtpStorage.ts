import { uniqBy } from 'lodash'
import { AppointmentLocation } from 'src/api/types/LocationsApi'
import BrowserStorage from 'src/utils/storage/BrowserStorage'
import hasStorage from 'src/utils/storage/hasStorage'

const hasLocalStorage = hasStorage('localStorage')
const browserStorage = new BrowserStorage(
  hasLocalStorage ? localStorage : sessionStorage,
)

enum TtpStorageKeys {
  Root = 'ttp-dHRwLWFwcG9pbnRtZW50cw==',
  Locations = 'locations',
}

export default class TtpStorage {
  static getRootData() {
    return browserStorage.get(TtpStorageKeys.Root) || {}
  }

  static getRecentLocations() {
    const rootData = TtpStorage.getRootData()

    return (rootData[TtpStorageKeys.Locations] || []) as AppointmentLocation[]
  }

  static saveRecentLocation(appointmentLocation: AppointmentLocation) {
    const rootData = TtpStorage.getRootData()

    const locations = uniqBy(
      [appointmentLocation, ...TtpStorage.getRecentLocations()],
      (apptLoc) => apptLoc.id,
    )

    browserStorage.save(TtpStorageKeys.Root, {
      ...rootData,
      [TtpStorageKeys.Locations]: locations,
    })
  }

  static clearRecentLocations() {
    const rootData = TtpStorage.getRootData()

    browserStorage.save(TtpStorageKeys.Root, {
      ...rootData,
      [TtpStorageKeys.Locations]: [],
    })
  }
}

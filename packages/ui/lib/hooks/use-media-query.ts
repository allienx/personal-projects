import { useCallback, useSyncExternalStore } from 'react'

// Taken from:
// https://usehooks.com/usemediaquery
// https://github.com/uidotdev/usehooks
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => {
      const matchMedia = window.matchMedia(query)

      matchMedia.addEventListener('change', callback)

      return () => {
        matchMedia.removeEventListener('change', callback)
      }
    },
    [query],
  )

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => {
    throw Error('useMediaQuery is a client-only hook')
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

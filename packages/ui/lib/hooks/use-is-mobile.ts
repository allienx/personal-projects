import { useMediaQuery } from './use-media-query'

export function useIsMobile() {
  return useMediaQuery('only screen and (max-width : 500px)')
}

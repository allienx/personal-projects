import { useEffect, useRef } from 'react'

type Delay = number | null
type TimerHandler = (...args: any[]) => void

/*
 * Taken from:
 * https://github.com/donavon/use-interval
 */
export function useInterval(callback: TimerHandler, delay: Delay) {
  const savedCallbackRef = useRef<TimerHandler>()

  useEffect(() => {
    savedCallbackRef.current = callback
  }, [callback])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const handler = (...args: any[]) => savedCallbackRef.current!(...args)

    if (delay !== null) {
      const intervalId = setInterval(handler, delay)

      return () => clearInterval(intervalId)
    }
  }, [delay])
}

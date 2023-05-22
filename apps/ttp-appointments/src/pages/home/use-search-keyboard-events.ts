import { useEffect } from 'react'

export interface UseSearchKeyboardEventsProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export default function useSearchKeyboardEvents({
  isOpen,
  onClose,
  onOpen,
}: UseSearchKeyboardEventsProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault()

        onClose()
      } else if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()

        if (isOpen) {
          onClose()
        } else {
          onOpen()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onOpen, onClose])
}

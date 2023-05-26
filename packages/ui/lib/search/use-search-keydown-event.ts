import { useEffect } from 'react'

export interface UseSearchKeyboardEventsProps {
  isOpen: boolean
  shortcutKey: string
  onOpen: () => void
  onClose: () => void
}

export default function useSearchKeydownEvent({
  isOpen,
  shortcutKey,
  onOpen,
  onClose,
}: UseSearchKeyboardEventsProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault()

        onClose()
      } else if (
        event.key === shortcutKey.toLowerCase() &&
        (event.metaKey || event.ctrlKey)
      ) {
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
  }, [isOpen, onOpen, onClose, shortcutKey])
}

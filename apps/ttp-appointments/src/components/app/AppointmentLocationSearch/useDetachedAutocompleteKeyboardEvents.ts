import { useEffect } from 'react'

export interface UseDetachedAutocompleteKeyboardEventsProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export default function useDetachedAutocompleteKeyboardEvents({
  isOpen,
  onClose,
  onOpen,
}: UseDetachedAutocompleteKeyboardEventsProps) {
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

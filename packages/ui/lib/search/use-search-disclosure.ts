import { useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'

export interface UseSearchDisclosureProps {
  shortcutKey: string
}

export default function useSearchDisclosure({
  shortcutKey,
}: UseSearchDisclosureProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
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

  return {
    isOpen,
    onOpen,
    onClose,
  }
}

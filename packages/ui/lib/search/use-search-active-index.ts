import { MouseEventHandler, useEffect, useState } from 'react'

interface UseSearchActiveIndexProps {
  listLength: number
}

export default function useSearchActiveIndex({
  listLength,
}: UseSearchActiveIndexProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [triggerSelection, setTriggerSelection] = useState(false)

  useEffect(() => {
    const scrollIntoView = (index: number) => {
      const listItem = document.getElementById(`slist-${index}`)

      listItem?.scrollIntoView({
        block: 'nearest',
      })
    }

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown': {
          setActiveIndex((prevState) => {
            const newIndex = prevState + 1

            scrollIntoView(newIndex)

            return newIndex < listLength ? newIndex : 0
          })

          break
        }

        case 'ArrowUp': {
          setActiveIndex((prevState) => {
            const newIndex = prevState - 1

            scrollIntoView(newIndex)

            return newIndex >= 0 ? newIndex : listLength - 1
          })

          break
        }

        case 'Enter':
          setTriggerSelection(true)
          break

        default:
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [listLength])

  const handleListItemMouseEnter: MouseEventHandler<HTMLLIElement> = (
    event,
  ) => {
    const index = Number(event.currentTarget.getAttribute('data-list-index'))

    setActiveIndex(index)
  }

  return {
    activeIndex,
    triggerSelection,
    onListItemMouseEnter: handleListItemMouseEnter,
  }
}

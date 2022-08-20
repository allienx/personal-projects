import { Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import drop from 'lodash/drop'
import sampleSize from 'lodash/sampleSize'
import shuffle from 'lodash/shuffle'
import { ReactNode, useEffect, useState } from 'react'
import SlotMachineSpinItem from './SlotMachineSpinItem'

export interface SlotMachineSpinProps extends BoxProps {
  options: string[]
  values: string[]
  renderValue?: (val: string) => ReactNode
}

const SPIN_DURATION_MS = 1000
const FIRST_SPIN_DELAY_MS = 5500
const SPIN_DELAY_MS = 2000

export default function SlotMachineSpin({
  options,
  values,
  renderValue,
  ...props
}: SlotMachineSpinProps) {
  const [spinOptions, setSpinOptions] = useState<string[]>([])
  const [spinValues, setSpinValues] = useState(() => {
    return [...values]
  })
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)

  const value = spinValues[0]

  const startSpinning = () => {
    setSpinOptions(sampleSize(options, 20))

    setSpinValues((prevSpinValues) => {
      return prevSpinValues.length > 1 ? drop(spinValues) : shuffle(values)
    })

    setIsSpinning(true)

    setTimeout(() => {
      setIsSpinning(false)
    }, SPIN_DURATION_MS)
  }

  // Automatically start spinning every 1.5 seconds.
  useEffect(() => {
    if (!isSpinning) {
      if (!hasSpun) {
        setHasSpun(true)
      }

      setTimeout(
        () => {
          startSpinning()
        },
        !hasSpun ? FIRST_SPIN_DELAY_MS : SPIN_DELAY_MS,
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpinning])

  return (
    <Box {...props}>
      {isSpinning ? (
        spinOptions.map((option: string, index: number) => {
          return (
            <SlotMachineSpinItem index={index} key={option}>
              {renderValue ? renderValue(option) : <div>{option}</div>}
            </SlotMachineSpinItem>
          )
        })
      ) : (
        <div>{renderValue ? renderValue(value) : value}</div>
      )}
    </Box>
  )
}

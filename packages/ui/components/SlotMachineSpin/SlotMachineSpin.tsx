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

  const value = spinValues[0]

  const startSpinning = () => {
    setSpinOptions(sampleSize(options, 20))

    setSpinValues((prevSpinValues) => {
      return prevSpinValues.length > 1 ? drop(spinValues) : shuffle(values)
    })

    setIsSpinning(true)

    setTimeout(() => {
      setIsSpinning(false)
    }, 1000)
  }

  // Automatically start spinning every 1.5 seconds.
  useEffect(() => {
    if (!isSpinning) {
      setTimeout(() => {
        startSpinning()
      }, 1500)
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

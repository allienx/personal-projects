import { Box } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { ReactNode, useEffect } from 'react'

export interface SlotMachineSpinItemsProps {
  index: number
  children: ReactNode
}

export default function SlotMachineSpinItem({
  index,
  children,
}: SlotMachineSpinItemsProps) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => {
      return {
        opacity: [0, 1, 0],
        y: [0, -25],
        transition: {
          delay: i * 0.065,
          duration: 0.15,
        },
      }
    })
  }, [controls])

  return (
    <Box animate={controls} as={motion.div} custom={index} position="absolute">
      {children}
    </Box>
  )
}

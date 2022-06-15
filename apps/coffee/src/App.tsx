import { Center, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import coffeeEmoji from './assets/coffee-2615.svg'

export default function App() {
  const [stopJumping, setStopJumping] = useState(false)

  return (
    <Center height="100vh">
      <a href="https://www.vervecoffee.com/account">
        <motion.div
          animate={{
            y: !stopJumping ? [0, -10, 0] : undefined,
          }}
          transition={{
            ease: 'linear',
            delay: 1,
            duration: 0.4,
            repeat: Infinity,
            repeatDelay: 2,
            repeatType: 'loop',
          }}
          onMouseEnter={() => {
            setStopJumping(true)
          }}
          onMouseLeave={() => {
            setStopJumping(false)
          }}
        >
          <Image
            _hover={{ filter: 'drop-shadow(0 0 2em)' }}
            alt="Coffee emoji"
            boxSize={40}
            src={coffeeEmoji}
          />
        </motion.div>
      </a>
    </Center>
  )
}

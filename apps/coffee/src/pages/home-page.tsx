import { Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import coffeeEmoji from 'src/assets/coffee-2615.svg'
import { PageWrapper } from 'ui'

export default function HomePage() {
  const [stopJumping, setStopJumping] = useState(false)

  return (
    <PageWrapper alignItems="center" justifyContent="center">
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
    </PageWrapper>
  )
}

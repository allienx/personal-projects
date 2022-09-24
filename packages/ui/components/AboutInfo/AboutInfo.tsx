import { Box, useTheme } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import drop from 'lodash/drop'
import shuffle from 'lodash/shuffle'
import { useMemo } from 'react'
import NerdLink from '../NerdLink/NerdLink'
import emojiData from '../SlotMachineSpin/emojis.json'
import SlotMachineSpin from '../SlotMachineSpin/SlotMachineSpin'

export interface AboutInfoProps {
  boxProps?: BoxProps
  githubRepoUrl: string
  initialEmoji?: string
}

const madeWithEmojis = [
  '⚛️',
  '👾',
  '💻',
  '🎯',
  '🚀',
  '☕',
  '🌮',
  '🥑',
  '⚡',
  '🔥',
  '🌊',
  '🏎️',
  '🎉',
  '🤓',
  '😂',
  '👻',
  '🤖',
  '🕺',
  '🙇',
  '🧘',
  '🧑‍💻',
  '💭',
  '🐶',
  '🦖',
  '🎨',
  '🧪',
]

export default function AboutInfo({
  boxProps,
  githubRepoUrl,
  initialEmoji = '❤️',
}: AboutInfoProps) {
  const theme = useTheme()

  const shuffledMadeWithEmojis = useMemo(() => {
    const emojis = madeWithEmojis.filter((emj) => emj !== initialEmoji)

    return [initialEmoji, ...shuffle(drop(emojis))]
  }, [initialEmoji])

  return (
    <Box
      alignItems="center"
      display="flex"
      fontSize={['md', 'xl']}
      {...boxProps}
    >
      <Box
        alignItems="center"
        display="flex"
        fontFamily="emoji"
        fontWeight="semibold"
        height={['35px', '40px']}
        mr={4}
      >
        Made with
        <SlotMachineSpin
          display="flex"
          fontSize={['xl', '2xl']}
          justifyContent="center"
          options={emojiData.emojis}
          values={shuffledMadeWithEmojis}
          width={['35px', '40px']}
        />
      </Box>

      <Box as="div" borderLeft={`2px solid ${theme.colors.gray['800']}`} pl={5}>
        <NerdLink
          isExternal
          color="blue.500"
          href={githubRepoUrl}
          label="Nerd Stuff"
        />
      </Box>
    </Box>
  )
}

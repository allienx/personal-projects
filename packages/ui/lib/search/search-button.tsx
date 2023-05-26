import { SearchIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, Kbd, Spacer } from '@chakra-ui/react'

interface SearchButtonProps extends ButtonProps {
  shortcutKey: string
}

const isAppleDevice = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)

export default function SearchButton({
  shortcutKey,
  ...props
}: SearchButtonProps) {
  return (
    <Button
      _hover={{ background: 'gray.50' }}
      leftIcon={<SearchIcon />}
      px={4}
      rightIcon={
        <div>
          <Kbd mr={1}>{isAppleDevice ? '⌘' : 'Ctrl'}</Kbd>
          <Kbd>K</Kbd>
        </div>
      }
      size="lg"
      variant="outline"
      width="100%"
      {...props}
    >
      <Spacer />
    </Button>
  )
}

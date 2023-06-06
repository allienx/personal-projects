import { SearchIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, Kbd, Spacer, Text } from '@chakra-ui/react'

interface SearchButtonProps extends ButtonProps {
  placeholder?: string
  shortcutKey: string
}

const isAppleDevice = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)

export default function SearchButton({
  placeholder,
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
      {placeholder && (
        <Text color="gray.500" fontSize="md" fontWeight={400}>
          {placeholder}
        </Text>
      )}
      <Spacer />
    </Button>
  )
}

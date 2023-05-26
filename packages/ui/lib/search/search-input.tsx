import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, BoxProps, ColorProps, IconButton, Input } from '@chakra-ui/react'
import { ChangeEventHandler } from 'react'

export interface SearchInputProps {
  boxProps?: BoxProps
  color?: ColorProps['color']
  name: string
  placeholder?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onClose: () => void
}

export default function SearchInput({
  boxProps,
  color = 'teal',
  name,
  placeholder,
  value,
  onChange,
  onClose,
}: SearchInputProps) {
  return (
    <Box alignItems="center" display="flex" {...boxProps}>
      <SearchIcon boxSize="1.25em" color={color} />

      <Input
        autoFocus
        _focus={{ outline: 'none' }}
        _focusVisible={{ outline: 'none' }}
        autoComplete="off"
        border="none"
        ml={4}
        name={name}
        outline="none"
        p={0}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <IconButton
        aria-label="Close search menu"
        color={color}
        icon={<CloseIcon />}
        size="sm"
        variant="ghost"
        onClick={onClose}
      />
    </Box>
  )
}

import {
  Box,
  BoxProps,
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import TtpLocationSearchContent from 'src/pages/home/ttp-location-search-content'
import SearchButton from 'ui/lib/search/search-button'
import useSearchKeydownEvent from 'ui/lib/search/use-search-keydown-event'

interface TtpLocationSearchProps {
  boxProps?: BoxProps
  onChange: (loc: TtpLocation) => void
}

export default function TtpLocationSearch({
  boxProps,
  onChange,
}: TtpLocationSearchProps) {
  const modalSize = useBreakpointValue({ base: 'full', md: 'md' })
  const { isOpen, onOpen, onClose } = useDisclosure()

  useSearchKeydownEvent({ isOpen, shortcutKey: 'k', onOpen, onClose })

  return (
    <Box {...boxProps}>
      <SearchButton shortcutKey="K" onClick={onOpen} />

      <Modal isOpen={isOpen} size={modalSize} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={[0, 4]} p={4}>
          <TtpLocationSearchContent onChange={onChange} onClose={onClose} />
        </ModalContent>
      </Modal>
    </Box>
  )
}

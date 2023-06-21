import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export type ApiFormModalSuccess<D> = {
  type: 'success'
  result: D
}

export type ApiFormModalCancel = {
  type: 'cancel'
}

export type ApiFormModalCloseContext<D> =
  | ApiFormModalSuccess<D>
  | ApiFormModalCancel

export interface ApiFormModalProps<D> {
  modalProps?: Omit<ModalProps, 'isOpen' | 'onClose' | 'children'>
  title: ReactNode
  onClose: (context: ApiFormModalCloseContext<D>) => void
  children: ReactNode
}

export default function ApiFormModal<D = any>({
  modalProps,
  title,
  onClose,
  children,
}: ApiFormModalProps<D>) {
  const modalSize = useBreakpointValue({ base: 'full', md: 'md' })

  const handleCancel = () => {
    onClose({ type: 'cancel' })
  }

  return (
    <Modal isOpen size={modalSize} onClose={handleCancel} {...modalProps}>
      <ModalOverlay />
      <ModalContent borderRadius={[0, 4]}>
        {typeof title === 'string' ? <ModalHeader>{title}</ModalHeader> : title}
        <ModalCloseButton />

        <Box px={6}>{children}</Box>
      </ModalContent>
    </Modal>
  )
}

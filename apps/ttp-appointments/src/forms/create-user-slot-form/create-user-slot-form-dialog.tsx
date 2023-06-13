import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useBreakpointValue,
} from '@chakra-ui/react'
import CreateUserSlotForm from 'src/forms/create-user-slot-form/create-user-slot-form'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import { TtpUserSlot } from 'src/http/ttp/ttp-user-slot'

export type FormDialogCloseSuccess<D> = {
  type: 'success'
  result: D
}

export type FormDialogCloseCancel = {
  type: 'cancel'
}

export type FormDialogClose<D> =
  | FormDialogCloseSuccess<D>
  | FormDialogCloseCancel

export interface CreateUserSlotFormDialogProps {
  initialTtpLocation: TtpLocation
  modalProps: Omit<ModalProps, 'children' | 'onClose'>
  onClose: (result: FormDialogClose<TtpUserSlot.IndexRecord>) => void
}

export default function CreateUserSlotFormDialog({
  initialTtpLocation,
  modalProps,
  onClose,
}: CreateUserSlotFormDialogProps) {
  const modalSize = useBreakpointValue({ base: 'full', md: 'md' })

  const handleCancel = () => {
    onClose({ type: 'cancel' })
  }

  return (
    <Modal size={modalSize} onClose={handleCancel} {...modalProps}>
      <ModalOverlay />
      <ModalContent borderRadius={[0, 4]}>
        <ModalHeader>Create Appointment Search</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <CreateUserSlotForm
            initialTtpLocation={initialTtpLocation}
            onCancel={handleCancel}
            onSuccess={({ httpResponse }) => {
              onClose({
                type: 'success',
                result: httpResponse.data.record,
              })
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

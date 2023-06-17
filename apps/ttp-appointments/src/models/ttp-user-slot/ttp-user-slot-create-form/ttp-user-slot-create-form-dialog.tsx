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
import { TtpLocation } from 'src/models/ttp-location/ttp-location'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import TtpUserSlotCreateForm from 'src/models/ttp-user-slot/ttp-user-slot-create-form/ttp-user-slot-create-form'

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

export interface TtpUserSlotCreateFormDialogProps {
  initialTtpLocation: TtpLocation
  modalProps: Omit<ModalProps, 'children' | 'onClose'>
  onClose: (result: FormDialogClose<TtpUserSlot.IndexRecord>) => void
}

export default function TtpUserSlotCreateFormDialog({
  initialTtpLocation,
  modalProps,
  onClose,
}: TtpUserSlotCreateFormDialogProps) {
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
          <TtpUserSlotCreateForm
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

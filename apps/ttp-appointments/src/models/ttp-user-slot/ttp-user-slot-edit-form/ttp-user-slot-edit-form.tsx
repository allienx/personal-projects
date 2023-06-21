import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  ModalFooter,
  Text,
  Textarea,
} from '@chakra-ui/react'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import useTtpUserSlotEditForm, {
  UseTtpUserSlotEditFormOnSuccess,
} from 'src/models/ttp-user-slot/ttp-user-slot-edit-form/use-ttp-user-slot-edit-form'

export interface TtpUserSlotEditFormProps {
  ttpUserSlot: TtpUserSlot.IndexRecord
  onCancel: () => void
  onSuccess: UseTtpUserSlotEditFormOnSuccess
}

export default function TtpUserSlotEditForm({
  ttpUserSlot,
  onCancel,
  onSuccess,
}: TtpUserSlotEditFormProps) {
  const { bodyField, formState, watch, handleSubmit } = useTtpUserSlotEditForm({
    ttpUserSlot,
    onSuccess,
  })
  const apiErrorMessage = watch('apiErrorMessage')

  return (
    <form onSubmit={handleSubmit}>
      {apiErrorMessage && (
        <Alert
          alignItems="flex-start"
          flexDirection="row"
          mb={4}
          status="error"
        >
          <div>
            <AlertIcon />
          </div>
          <Box whiteSpace="pre-wrap">
            <AlertTitle>Validation error</AlertTitle>
            <AlertDescription>{apiErrorMessage}</AlertDescription>
          </Box>
        </Alert>
      )}

      <FormControl>
        <FormLabel>Location</FormLabel>
        <Text>{getTtpLocationDisplayName(ttpUserSlot.location)}</Text>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Body</FormLabel>
        <Textarea fontFamily="mono" rows={20} size="sm" {...bodyField} />
      </FormControl>

      <ModalFooter px={0} py={4}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          colorScheme="teal"
          isLoading={formState.isSubmitting}
          ml={3}
          type="submit"
          variant="solid"
        >
          Save
        </Button>
      </ModalFooter>
    </form>
  )
}

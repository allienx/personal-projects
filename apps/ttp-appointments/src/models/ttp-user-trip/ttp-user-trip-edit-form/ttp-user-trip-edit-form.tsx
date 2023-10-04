import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  ModalFooter,
  NumberInput,
  NumberInputField,
  Text,
  Textarea,
} from '@chakra-ui/react'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpUserTrip } from 'src/models/ttp-user-trip/ttp-user-trip'
import useTtpUserTripEditForm, {
  UseTtpUserTripEditFormOnSuccess,
} from 'src/models/ttp-user-trip/ttp-user-trip-edit-form/use-ttp-user-trip-edit-form'

export interface TtpUserTripEditFormProps {
  ttpUserTrip: TtpUserTrip.IndexRecord
  onCancel: () => void
  onSuccess: UseTtpUserTripEditFormOnSuccess
}

export default function TtpUserTripEditForm({
  ttpUserTrip,
  onCancel,
  onSuccess,
}: TtpUserTripEditFormProps) {
  const { numDaysField, bodyField, formState, watch, handleSubmit } =
    useTtpUserTripEditForm({
      ttpUserTrip,
      onSuccess,
    })
  const apiErrorMessage = watch('apiErrorMessage')
  const numDays = watch('numDays')

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
        <Text>{getTtpLocationDisplayName(ttpUserTrip.location)}</Text>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Search Range in Days</FormLabel>
        <NumberInput min={0}>
          <NumberInputField {...numDaysField} />
        </NumberInput>
        <FormHelperText>
          {!numDays
            ? `You will be notified for all available appointments.`
            : `You will be notified for all available appointments that occur within
          the next ${numDays} days.`}
        </FormHelperText>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Body</FormLabel>
        <Textarea fontFamily="mono" rows={20} size="sm" {...bodyField} />
      </FormControl>

      <ModalFooter px={0} py={4}>
        <Button isDisabled={formState.isSubmitting} onClick={onCancel}>
          Cancel
        </Button>
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

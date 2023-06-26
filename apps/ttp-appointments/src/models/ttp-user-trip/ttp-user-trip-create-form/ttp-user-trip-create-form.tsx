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
  Select,
  Textarea,
} from '@chakra-ui/react'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpLocation } from 'src/models/ttp-location/ttp-location'
import useTtpLocationsQuery from 'src/models/ttp-location/use-ttp-locations-query'
import useTtpUserTripCreateForm, {
  UseTtpUserTripCreateFormOnSuccess,
} from 'src/models/ttp-user-trip/ttp-user-trip-create-form/use-ttp-user-trip-create-form'

export interface TtpUserTripCreateFormProps {
  initialTtpLocation: TtpLocation
  onCancel: () => void
  onSuccess: UseTtpUserTripCreateFormOnSuccess
}

export default function TtpUserTripCreateForm({
  initialTtpLocation,
  onCancel,
  onSuccess,
}: TtpUserTripCreateFormProps) {
  const { ttpLocations } = useTtpLocationsQuery()

  const { ttpLocationIdField, bodyField, formState, watch, handleSubmit } =
    useTtpUserTripCreateForm({
      initialTtpLocation,
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
        <Select {...ttpLocationIdField}>
          {ttpLocations.map((loc) => {
            return (
              <option key={loc.id} value={loc.id}>
                {getTtpLocationDisplayName(loc)}
              </option>
            )
          })}
        </Select>
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

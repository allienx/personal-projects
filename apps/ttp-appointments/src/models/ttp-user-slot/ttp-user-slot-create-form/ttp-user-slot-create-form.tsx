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
import useTtpUserSlotCreateForm, {
  UseTtpUserSlotCreateFormOnSuccess,
} from 'src/models/ttp-user-slot/ttp-user-slot-create-form/use-ttp-user-slot-create-form'

export interface TtpUserSlotCreateFormProps {
  initialTtpLocation: TtpLocation
  onCancel: () => void
  onSuccess: UseTtpUserSlotCreateFormOnSuccess
}

export default function TtpUserSlotCreateForm({
  initialTtpLocation,
  onCancel,
  onSuccess,
}: TtpUserSlotCreateFormProps) {
  const { ttpLocations } = useTtpLocationsQuery()

  const { ttpLocationIdField, bodyField, formState, watch, handleSubmit } =
    useTtpUserSlotCreateForm({
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
          mb={6}
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

        <ModalFooter px={0}>
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
      </FormControl>
    </form>
  )
}

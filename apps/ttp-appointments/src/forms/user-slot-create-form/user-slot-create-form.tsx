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
import useUserSlotCreateForm, {
  UseUserSlotCreateFormOnSuccess,
} from 'src/forms/user-slot-create-form/use-user-slot-create-form'
import getTtpLocationDisplayName from 'src/http/ttp/get-ttp-location-display-name'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import useTtpLocationsQuery from 'src/http/ttp/use-ttp-locations-query'

export interface UserSlotCreateFormProps {
  initialTtpLocation: TtpLocation
  onCancel: () => void
  onSuccess: UseUserSlotCreateFormOnSuccess
}

export default function UserSlotCreateForm({
  initialTtpLocation,
  onCancel,
  onSuccess,
}: UserSlotCreateFormProps) {
  const { ttpLocations } = useTtpLocationsQuery()

  const { ttpLocationIdField, bodyField, formState, watch, handleSubmit } =
    useUserSlotCreateForm({
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

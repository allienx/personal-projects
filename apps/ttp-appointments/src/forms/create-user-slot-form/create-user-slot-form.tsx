import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  ModalFooter,
  Text,
  Textarea,
} from '@chakra-ui/react'
import useCreateUserSlotForm, {
  UseCreateUserSlotFormOnSuccess,
} from 'src/forms/create-user-slot-form/use-create-user-slot-form'
import getTtpLocationDisplayName from 'src/http/ttp/get-ttp-location-display-name'
import { TtpLocation } from 'src/http/ttp/ttp-location'

export interface CreateUserSlotFormProps {
  ttpLocation: TtpLocation
  onCancel: () => void
  onSuccess: UseCreateUserSlotFormOnSuccess
}

export default function CreateUserSlotForm({
  ttpLocation,
  onCancel,
  onSuccess,
}: CreateUserSlotFormProps) {
  const { bodyField, formState, watch, handleSubmit } = useCreateUserSlotForm({
    ttpLocation,
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

      <Flex>
        <Text fontWeight={600}>Location:</Text>
        <Text color="gray.500" fontWeight={500} ml={2}>
          {getTtpLocationDisplayName(ttpLocation)}
        </Text>
      </Flex>

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

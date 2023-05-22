import { SettingsIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import useOauthState from 'react-oauth/src/use-oauth-state'
import getAppointmentSlots from 'src/api/getAppointmentSlots'
import { AppointmentSlotsApiResponse } from 'src/api/types/AppointmentSlotsApi'
import { AppointmentLocation } from 'src/api/types/LocationsApi'
import AppointmentSlotList from 'src/components/app/AppointmentSlotList/AppointmentSlotList'
import LoadingSpinner from 'src/components/app/Spinner/LoadingSpinner'

interface AppointmentSlotListDataProps {
  appointmentLocation: AppointmentLocation | null
}

export default function AppointmentSlotListData({
  appointmentLocation,
}: AppointmentSlotListDataProps) {
  const { logout } = useOauthState()

  const queryFn = useCallback(async () => {
    return appointmentLocation
      ? getAppointmentSlots(appointmentLocation.id)
      : null
  }, [appointmentLocation])

  const appointmentSlotsQuery = useQuery<AppointmentSlotsApiResponse | null>(
    ['appointmentSlots', appointmentLocation?.id],
    queryFn,
    {
      enabled: !!appointmentLocation,
    },
  )

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" mt={4}>
        <Tag
          as="div"
          colorScheme="teal"
          px={4}
          py={2}
          size="lg"
          variant="solid"
        >
          {appointmentLocation ? (
            <div>
              <Text color="gray.300" fontSize="xs" fontWeight={500}>
                {appointmentLocation.city}, {appointmentLocation.province}
              </Text>
              <Text color="white" fontWeight={600}>
                {appointmentLocation.name || appointmentLocation.nameShort}
              </Text>
            </div>
          ) : (
            'No Location'
          )}
        </Tag>

        <Flex alignItems="center" ml={2}>
          {appointmentSlotsQuery.data && appointmentSlotsQuery.isFetching ? (
            <LoadingSpinner mr={2} size="sm" thickness="2px" />
          ) : (
            <Box width="24px" />
          )}

          <Menu isLazy>
            <MenuButton
              aria-label="Open settings menu"
              as={IconButton}
              icon={<SettingsIcon />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem
                onClick={() => {
                  appointmentSlotsQuery.refetch()
                }}
              >
                Refresh appointments
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout()
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Box mt={8}>
        {appointmentSlotsQuery.isLoading && !appointmentSlotsQuery.isError && (
          <Center>
            <LoadingSpinner size="md" thickness="2px" />
          </Center>
        )}

        {!appointmentSlotsQuery.isLoading && appointmentSlotsQuery.isError && (
          <Alert status="error">
            <AlertIcon />
            There was an error loading the slots.
          </Alert>
        )}

        {!appointmentSlotsQuery.isLoading &&
          !appointmentSlotsQuery.isError &&
          appointmentSlotsQuery.data && (
            <AppointmentSlotList slots={appointmentSlotsQuery.data.data} />
          )}
      </Box>
    </>
  )
}

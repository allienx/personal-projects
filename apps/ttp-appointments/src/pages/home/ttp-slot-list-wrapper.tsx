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
import useOauthState from 'react-oauth/lib/use-oauth-state'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp-api-response'
import getTtpLocationCity from 'src/models/ttp-location/get-ttp-location-city'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpLocation } from 'src/models/ttp-location/ttp-location'
import { TtpSlot } from 'src/models/ttp-slot/ttp-slot'
import TtpSlotList from 'src/pages/home/ttp-slot-list'
import useHttpQuery from 'ui/lib/http/use-http-query'

interface TtpSlotListWrapperProps {
  ttpLocation: TtpLocation | null
}

export default function TtpSlotListWrapper({
  ttpLocation,
}: TtpSlotListWrapperProps) {
  const { logout } = useOauthState()

  const ttpSlotsQuery = useHttpQuery<TtpApiListResponse<TtpSlot>>({
    httpClient: appHttpClient,
    url: TtpApi.slotsUrl(),
    config: {
      params: { locationId: ttpLocation?.id },
    },
    queryOpts: {
      enabled: !!ttpLocation?.id,
    },
  })

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
          {ttpLocation ? (
            <div>
              <Text color="gray.200" fontSize="xs" fontWeight={500}>
                {getTtpLocationCity(ttpLocation)}
              </Text>
              <Text color="white" fontWeight={600}>
                {getTtpLocationDisplayName(ttpLocation)}
              </Text>
            </div>
          ) : (
            'No Location'
          )}
        </Tag>

        <Flex alignItems="center" ml={2}>
          {ttpSlotsQuery.data && ttpSlotsQuery.isFetching ? (
            <LoadingSpinner mr={2} size="sm" />
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
                  ttpSlotsQuery.refetch()
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

      {ttpLocation && (
        <Box mt={8}>
          {ttpSlotsQuery.isLoading && !ttpSlotsQuery.isError && (
            <Center>
              <LoadingSpinner />
            </Center>
          )}

          {!ttpSlotsQuery.isLoading && ttpSlotsQuery.isError && (
            <Alert status="error">
              <AlertIcon />
              There was an error loading appointment availability.
            </Alert>
          )}

          {!ttpSlotsQuery.isLoading &&
            !ttpSlotsQuery.isError &&
            ttpSlotsQuery.data && (
              <TtpSlotList
                ttpLocation={ttpLocation}
                ttpSlots={ttpSlotsQuery.data.records}
              />
            )}
        </Box>
      )}
    </>
  )
}

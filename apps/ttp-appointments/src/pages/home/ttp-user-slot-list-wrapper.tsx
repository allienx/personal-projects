import { SettingsIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Box,
  BoxProps,
  Card,
  CardBody,
  Center,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { parse } from 'date-fns'
import format from 'date-fns/format'
import { sortBy, startCase } from 'lodash'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import getTtpLocationCity from 'src/http/ttp/get-ttp-location-city'
import getTtpLocationDisplayName from 'src/http/ttp/get-ttp-location-display-name'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp/ttp-api-response'
import { TtpUserSlot } from 'src/http/ttp/ttp-user-slot'
import useHttpQuery from 'src/http/use-http-query'

interface TtpUserSlotListWrapperProps {
  boxProps?: BoxProps
}

export default function TtpUserSlotListWrapper({
  boxProps,
}: TtpUserSlotListWrapperProps) {
  const ttpUserSlotsQuery = useHttpQuery<
    TtpApiListResponse<TtpUserSlot.IndexRecord>
  >({
    url: TtpApi.userSlotsUrl(),
  })
  const { records: ttpUserSlots } = ttpUserSlotsQuery.data || {}

  return (
    <Box {...boxProps}>
      {ttpUserSlotsQuery.isFetching && !ttpUserSlotsQuery.isError && (
        <Center>
          <LoadingSpinner />
        </Center>
      )}

      {!ttpUserSlotsQuery.isFetching && ttpUserSlotsQuery.isError && (
        <Alert status="error">
          <AlertIcon />
          There was an error loading your appointment searches.
        </Alert>
      )}

      {!ttpUserSlotsQuery.isFetching &&
        !ttpUserSlotsQuery.isError &&
        ttpUserSlots &&
        sortBy(ttpUserSlots, (tus) =>
          getTtpLocationDisplayName(tus.location),
        ).map((userSlot) => {
          return (
            <Card key={userSlot.id} my={6}>
              <CardBody>
                <Flex justifyContent="space-between">
                  <div>
                    <Text fontSize="lg" fontWeight={600}>
                      {getTtpLocationDisplayName(userSlot.location)}
                    </Text>
                    <Text fontSize="sm">
                      {getTtpLocationCity(userSlot.location)}
                    </Text>
                  </div>
                  <IconButton
                    aria-label="See user slot menu"
                    colorScheme="gray"
                    icon={<SettingsIcon />}
                    ml={3}
                    mr={-2.5}
                    mt={-1}
                    size="sm"
                    variant="ghost"
                  />
                </Flex>

                {userSlot.slots.map((slot) => {
                  return (
                    <Text fontSize="sm" key={slot.dayOfWeek} mt={2}>
                      {startCase(slot.dayOfWeek)}:{' '}
                      {slot.timeRange
                        .map((time) =>
                          format(parse(time, 'H:mm', new Date()), 'h:mmaaa'),
                        )
                        .join(' - ')}
                    </Text>
                  )
                })}

                <Flex alignItems="center" mt={2}>
                  <Tooltip label={userSlot.isEnabled ? 'Enabled' : 'Disabled'}>
                    <Box
                      bgColor={userSlot.isEnabled ? '#06C019' : '#EF0000'}
                      borderRadius="50%"
                      height={3}
                      mt={0.5}
                      width={3}
                    />
                  </Tooltip>
                  <Text fontSize="sm" ml={2}>
                    {userSlot.notifications.map((n) => n.email).join(', ')}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          )
        })}
    </Box>
  )
}

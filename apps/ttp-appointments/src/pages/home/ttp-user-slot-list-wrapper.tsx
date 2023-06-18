import {
  Alert,
  AlertIcon,
  Box,
  BoxProps,
  Card,
  CardBody,
  Center,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { parse } from 'date-fns'
import format from 'date-fns/format'
import { sortBy, startCase } from 'lodash'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp-api-response'
import getTtpLocationCity from 'src/models/ttp-location/get-ttp-location-city'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import TtpUserSlotActionMenu from 'src/models/ttp-user-slot/ttp-user-slot-action-menu/ttp-user-slot-action-menu'
import useHttpQuery from 'ui/lib/http/use-http-query'

interface TtpUserSlotListWrapperProps {
  boxProps?: BoxProps
}

export default function TtpUserSlotListWrapper({
  boxProps,
}: TtpUserSlotListWrapperProps) {
  const ttpUserSlotsQuery = useHttpQuery<
    TtpApiListResponse<TtpUserSlot.IndexRecord>
  >({
    httpClient: appHttpClient,
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
        ).map((ttpUserSlot) => {
          return (
            <Card key={ttpUserSlot.id} my={6}>
              <CardBody>
                <Flex justifyContent="space-between">
                  <div>
                    <Text fontSize="lg" fontWeight={600}>
                      {getTtpLocationDisplayName(ttpUserSlot.location)}
                    </Text>
                    <Text fontSize="sm">
                      {getTtpLocationCity(ttpUserSlot.location)}
                    </Text>
                  </div>
                  <TtpUserSlotActionMenu
                    menuButtonProps={{
                      'aria-label': 'See user slot action menu',
                      ml: 3,
                      mr: -2.5,
                      mt: -1,
                    }}
                    ttpUserSlot={ttpUserSlot}
                  />
                </Flex>

                {ttpUserSlot.slots.map((slot) => {
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
                  <Tooltip
                    label={ttpUserSlot.isEnabled ? 'Enabled' : 'Disabled'}
                  >
                    <Box
                      bgColor={ttpUserSlot.isEnabled ? '#06C019' : '#EF0000'}
                      borderRadius="50%"
                      height={3}
                      mt={0.5}
                      width={3}
                    />
                  </Tooltip>
                  <Text fontSize="sm" ml={2}>
                    {ttpUserSlot.notifications.map((n) => n.email).join(', ')}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          )
        })}
    </Box>
  )
}

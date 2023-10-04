import {
  Box,
  BoxProps,
  Card,
  CardBody,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { parse } from 'date-fns'
import format from 'date-fns/format'
import { sortBy, startCase } from 'lodash'
import getTtpLocationCity from 'src/models/ttp-location/get-ttp-location-city'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpUserTrip } from 'src/models/ttp-user-trip/ttp-user-trip'
import TtpUserTripActionMenu from 'src/models/ttp-user-trip/ttp-user-trip-action-menu/ttp-user-trip-action-menu'

export interface TtpUserTripListProps {
  boxProps?: BoxProps
  ttpUserTrips: TtpUserTrip.IndexRecord[]
}

export default function TtpUserTripList({
  boxProps,
  ttpUserTrips,
}: TtpUserTripListProps) {
  const sortedUserTrips = sortBy(ttpUserTrips, (tus) =>
    getTtpLocationDisplayName(tus.location),
  )

  return (
    <Box {...boxProps}>
      {sortedUserTrips.length === 0 ? (
        <Text>
          You don&apos;t have any appointment searches, find a location above to
          get started!
        </Text>
      ) : (
        sortedUserTrips.map((ttpUserTrip) => {
          return (
            <Card key={ttpUserTrip.id} my={6}>
              <CardBody>
                <Flex justifyContent="space-between">
                  <div>
                    <Text fontSize="lg" fontWeight={600}>
                      {getTtpLocationDisplayName(ttpUserTrip.location)}
                    </Text>
                    <Text fontSize="sm">
                      {getTtpLocationCity(ttpUserTrip.location)}
                    </Text>
                    <Text fontSize="sm" mt={2}>
                      {ttpUserTrip.numDays
                        ? `Searching for the next ${ttpUserTrip.numDays} days:`
                        : 'Searching for all available appointments:'}
                    </Text>
                  </div>
                  <TtpUserTripActionMenu
                    menuButtonProps={{
                      'aria-label': 'See user slot action menu',
                      ml: 3,
                      mr: -2.5,
                      mt: -1,
                    }}
                    ttpUserTrip={ttpUserTrip}
                  />
                </Flex>

                {ttpUserTrip.slots.map((slot) => {
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
                    label={ttpUserTrip.isEnabled ? 'Enabled' : 'Disabled'}
                  >
                    <Box
                      bgColor={ttpUserTrip.isEnabled ? '#06C019' : '#EF0000'}
                      borderRadius="50%"
                      height={3}
                      mt={0.5}
                      width={3}
                    />
                  </Tooltip>
                  <Text fontSize="sm" ml={2}>
                    {ttpUserTrip.notifications.map((n) => n.email).join(', ')}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          )
        })
      )}
    </Box>
  )
}

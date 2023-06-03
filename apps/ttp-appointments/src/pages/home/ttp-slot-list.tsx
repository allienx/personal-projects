import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  BoxProps,
  Button,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz'
import groupBy from 'lodash/groupBy'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import { TtpSlot } from 'src/http/ttp/ttp-slot'

interface TtpSlotListProps extends BoxProps {
  ttpLocation: TtpLocation
  ttpSlots: TtpSlot[]
}

export default function TtpSlotList({
  ttpLocation,
  ttpSlots,
  ...props
}: TtpSlotListProps) {
  const slotsByDay = groupBy(ttpSlots, (slot) => {
    const zonedDate = zonedTimeToUtc(slot.startTimestamp, ttpLocation.timezone)

    return formatInTimeZone(zonedDate, ttpLocation.timezone, 'yyyy-MM-dd')
  })

  if (ttpSlots.length === 0) {
    return (
      <Box {...props}>
        <Text textAlign="center">No available appointments.</Text>
      </Box>
    )
  }

  return (
    <Box {...props}>
      {Object.keys(slotsByDay).map((isoDateStr, index) => {
        const slotsForDay = slotsByDay[isoDateStr]

        const date = parseISO(isoDateStr)
        const monthDayStr = format(date, 'EEEE, LLL d')
        const yearStr = format(date, 'yyyy')

        return (
          <Box key={isoDateStr} pb={3} pt={index > 0 ? 3 : 0}>
            <Flex alignItems="center" justifyContent="space-between">
              <div>
                <Text as="div" fontSize="lg" fontWeight={600}>
                  {monthDayStr}
                </Text>
                <Text as="div" color="gray.500" fontSize="lg" fontWeight={600}>
                  {yearStr}
                </Text>
              </div>

              <Link
                isExternal
                _hover={{ textDecoration: 'none' }}
                href="https://ttp.cbp.dhs.gov/schedulerui/schedule-interview/location?lang=en&vo=true&service=UP"
              >
                <Button rightIcon={<ArrowForwardIcon />}>Go</Button>
              </Link>
            </Flex>

            <Box mt={4}>
              {slotsForDay.map((slot) => {
                const { startTimestamp, duration } = slot

                const zonedDate = zonedTimeToUtc(
                  startTimestamp,
                  ttpLocation.timezone,
                )
                const timeStr = formatInTimeZone(
                  zonedDate,
                  ttpLocation.timezone,
                  'p',
                )

                return (
                  <Flex
                    _hover={{ background: 'gray.50', borderRadius: 4 }}
                    alignItems="center"
                    key={startTimestamp}
                    pb={2}
                    pl={8}
                    pt={2}
                  >
                    <Text width={75}>{timeStr}</Text>
                    <Badge colorScheme="teal" ml={4} variant="outline">
                      {duration} mins
                    </Badge>
                  </Flex>
                )
              })}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

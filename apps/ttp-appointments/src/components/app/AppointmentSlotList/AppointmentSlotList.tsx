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
import formatISO from 'date-fns/formatISO'
import parseISO from 'date-fns/parseISO'
import groupBy from 'lodash/groupBy'
import { AppointmentSlot } from 'src/api/types/AppointmentSlotsApi'

interface AppointmentSlotListProps extends BoxProps {
  slots: AppointmentSlot[]
}

export default function AppointmentSlotList({
  slots,
  ...props
}: AppointmentSlotListProps) {
  const slotsByDay = groupBy(slots, (slot) => {
    return formatISO(new Date(slot.startTime), { representation: 'date' })
  })

  if (slots.length === 0) {
    return (
      <Box {...props}>
        <Text textAlign="center">No available appointments.</Text>
      </Box>
    )
  }

  return (
    <Box {...props}>
      {Object.keys(slotsByDay).map((isoDateStr, index) => {
        const slotsForDay = slotsByDay[isoDateStr] as AppointmentSlot[]

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
                const { startTime, durationMins } = slot

                const timeStr = format(new Date(startTime), 'p')

                return (
                  <Flex
                    _hover={{ background: 'gray.50', borderRadius: 4 }}
                    alignItems="center"
                    key={startTime}
                    pb={2}
                    pl={8}
                    pt={2}
                  >
                    <Text width={75}>{timeStr}</Text>
                    <Badge colorScheme="teal" ml={4} variant="outline">
                      {durationMins} mins
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

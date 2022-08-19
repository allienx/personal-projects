import {
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import { IpApiResponse } from 'pages/api/ip-lookup'
import { ReactNode } from 'react'

export interface IpAddressLookupDataProps {
  boxProps?: BoxProps
  ipLookup: IpApiResponse
}

type PropertyDef = {
  key: keyof IpApiResponse
  label: string
  renderValue?: (data: IpApiResponse) => ReactNode
}

const propertyDefs: PropertyDef[] = [
  { key: 'isp', label: 'ISP' },
  { key: 'lat', label: 'Latitude' },
  { key: 'lon', label: 'Longitude' },
  { key: 'timezone', label: 'Time Zone' },
  { key: 'city', label: 'City' },
  { key: 'region', label: 'Province' },
  { key: 'zip', label: 'Postal Code' },
  {
    key: 'country',
    label: 'Country',
    renderValue: (data) => {
      const { country, countryCode } = data

      return (
        <Flex alignItems="center">
          <div>{country}</div>
          <Image
            alt={`${countryCode} flag`}
            height="28px"
            ml={4}
            src={`https://flagpedia.net/data/flags/vector/${countryCode.toLowerCase()}.svg`}
          />
        </Flex>
      )
    },
  },
]

export default function IpAddressLookupData({
  boxProps,
  ipLookup,
}: IpAddressLookupDataProps) {
  return (
    <Box {...boxProps}>
      <TableContainer>
        <Table fontSize={['md', 'xl']} variant="unstyled">
          <Tbody>
            {propertyDefs.map((def) => {
              return (
                <Tr key={def.key}>
                  <Td fontWeight="bold" p={3} textAlign="right" width="45%">
                    {def.label}
                  </Td>
                  <Td p={3}>
                    {def.renderValue
                      ? def.renderValue(ipLookup)
                      : ipLookup[def.key]}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

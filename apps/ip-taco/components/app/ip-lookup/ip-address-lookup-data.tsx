import { Box, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import { IpApiResponse } from 'pages/api/ip-lookup'

export interface IpAddressLookupDataProps {
  boxProps?: BoxProps
  ipLookup: IpApiResponse
}

type PropertyDef = {
  key: keyof IpApiResponse
  label: string
}

const propertyDefs: PropertyDef[] = [
  { key: 'isp', label: 'ISP' },
  { key: 'lat', label: 'Latitude' },
  { key: 'lon', label: 'Longitude' },
  { key: 'city', label: 'City' },
  { key: 'region', label: 'Province' },
  { key: 'zip', label: 'Postal Code' },
  { key: 'country', label: 'Country' },
  { key: 'timezone', label: 'Time Zone' },
]

export default function IpAddressLookupData({
  boxProps,
  ipLookup,
}: IpAddressLookupDataProps) {
  return (
    <Box {...boxProps}>
      <TableContainer>
        <Table fontSize="xl" variant="unstyled">
          <Tbody>
            {propertyDefs.map((def) => {
              return (
                <Tr key={def.key}>
                  <Td fontWeight="bold" p={3} textAlign="right" width="45%">
                    {def.label}
                  </Td>
                  <Td p={3}>{ipLookup[def.key]}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

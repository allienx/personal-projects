import { Box, Text } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import debounce from 'lodash/debounce'
import { MouseEventHandler, useMemo, useState } from 'react'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp/ttp-api-list-response'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import useHttpQuery from 'src/http/use-http-query'
import ttpStorage from 'src/utils/storage/ttp-storage'
import SearchInput from 'ui/lib/search/search-input'
import SearchList from 'ui/lib/search/search-list'

export interface TtpLocationListWrapperProps {
  onChange: (ttpLocation: TtpLocation) => void
  onClose: () => void
}

export default function TtpLocationSearchContent({
  onChange,
  onClose,
}: TtpLocationListWrapperProps) {
  const [searchValue, setSearchValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const allTtpLocationsQuery = useHttpQuery<TtpApiListResponse<TtpLocation>>({
    url: TtpApi.locationsUrl(),
    queryOpts: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: 'always',
    },
  })
  const allTtpLocations = allTtpLocationsQuery.data?.records

  const fuse = useMemo(() => {
    return new Fuse(allTtpLocations || [], {
      keys: ['name', 'shortName', 'city', 'state'],
      includeScore: true,
      minMatchCharLength: 2,
    })
  }, [allTtpLocations])

  const defaultTtpLocations = useMemo(() => {
    const recentLocations = ttpStorage.getRecentLocations()
    const locations =
      recentLocations.length !== 0
        ? recentLocations
        : (allTtpLocations || []).slice(0, 10)

    return locations.map((loc, index) => {
      return {
        item: loc,
        refIndex: index,
        score: 0,
      } as Fuse.FuseResult<TtpLocation>
    })
  }, [allTtpLocations])

  const searchMatches = useMemo(() => {
    return searchValue
      ? fuse.search(searchValue).slice(0, 10)
      : defaultTtpLocations
  }, [defaultTtpLocations, fuse, searchValue])

  const updateSearchValue = useMemo(() => {
    return debounce((newSearchValue) => {
      setSearchValue(newSearchValue)
    }, 100)
  }, [])

  const handleTtpLocationClick: MouseEventHandler<HTMLLIElement> = (event) => {
    const locId = Number(event.currentTarget.getAttribute('data-ttp-loc-id'))
    const selectedTtpLocation = (allTtpLocations || []).find((loc) => {
      return loc.id === locId
    })

    if (!selectedTtpLocation) {
      return
    }

    onChange(selectedTtpLocation)
    onClose()
  }

  if (!allTtpLocations) {
    return (
      <Box display="flex" justifyContent="center" p={5}>
        <LoadingSpinner />
      </Box>
    )
  }

  return (
    <div>
      <SearchInput
        name="locSearchValue"
        placeholder="Search locations"
        value={inputValue}
        onChange={(event) => {
          const newValue = event.target.value

          setInputValue(newValue)
          updateSearchValue(newValue)
        }}
        onClose={onClose}
      />

      <SearchList
        boxProps={{
          height: ['120vh', 'inherit'],
          maxHeight: ['inherit', 425],
          overflowY: 'auto',
        }}
      >
        {searchMatches.map((match) => {
          const ttpLocation = match.item

          return (
            <Box
              _hover={{ cursor: 'pointer' }}
              as="li"
              // bgColor={isActive ? 'teal' : undefined}
              borderRadius={4}
              data-ttp-loc-id={ttpLocation.id}
              key={ttpLocation.id}
              listStyleType="none"
              px={4}
              py={2}
              onClick={handleTtpLocationClick}
            >
              <Text
                // color={isActive ? 'gray.300' : 'gray'}
                fontSize="xs"
                fontWeight={500}
              >
                {ttpLocation.city}, {ttpLocation.state}
              </Text>
              <Text fontWeight={600}>
                {ttpLocation.name || ttpLocation.shortName}
              </Text>
            </Box>
          )
        })}
      </SearchList>
    </div>
  )
}

import { Alert, AlertIcon, Box, Text } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import debounce from 'lodash/debounce'
import { MouseEventHandler, useEffect, useMemo, useState } from 'react'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp/ttp-api-list-response'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import useHttpQuery from 'src/http/use-http-query'
import ttpStorage from 'src/utils/storage/ttp-storage'
import getSearchListItemProps from 'ui/lib/search/get-search-list-item-props'
import SearchInput from 'ui/lib/search/search-input'
import SearchList from 'ui/lib/search/search-list'
import useSearchActiveIndex from 'ui/lib/search/use-search-active-index'

export interface TtpLocationSearchProps {
  onChange: (ttpLocation: TtpLocation) => void
  onClose: () => void
}

export default function TtpLocationSearch({
  onChange,
  onClose,
}: TtpLocationSearchProps) {
  const [searchValue, setSearchValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const allTtpLocationsQuery = useHttpQuery<TtpApiListResponse<TtpLocation>>({
    url: TtpApi.locationsUrl(),
    queryOpts: {
      cacheTime: Infinity,
      staleTime: 60 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
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

  const { activeIndex, triggerSelection, onListItemMouseEnter } =
    useSearchActiveIndex({
      listLength: searchMatches.length,
    })

  useEffect(() => {
    if (!triggerSelection) {
      return
    }

    const match = searchMatches[activeIndex]

    if (!(match && match.item)) {
      return
    }

    onChange(match.item)
    onClose()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSelection])

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

  if (!allTtpLocations && allTtpLocationsQuery.error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error loading available locations.
      </Alert>
    )
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
        {searchMatches.map((match, index) => {
          const ttpLocation = match.item
          const isActive = index === activeIndex

          return (
            <Box
              data-group
              _hover={{ cursor: 'pointer', bgColor: 'teal' }}
              as="li"
              bgColor={isActive ? 'teal' : undefined}
              borderRadius={4}
              data-ttp-loc-id={ttpLocation.id}
              key={ttpLocation.id}
              listStyleType="none"
              px={4}
              py={2}
              onClick={handleTtpLocationClick}
              onMouseEnter={onListItemMouseEnter}
              {...getSearchListItemProps(index)}
            >
              <Text
                _groupHover={{ color: 'gray.200' }}
                color={isActive ? 'gray.200' : 'gray'}
                fontSize="xs"
                fontWeight={500}
              >
                {ttpLocation.city}, {ttpLocation.state}
              </Text>
              <Text
                _groupHover={{ color: 'white' }}
                color={isActive ? 'white' : undefined}
                fontWeight={600}
              >
                {ttpLocation.name || ttpLocation.shortName}
              </Text>
            </Box>
          )
        })}
      </SearchList>
    </div>
  )
}

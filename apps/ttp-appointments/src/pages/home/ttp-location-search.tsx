import { Box, Text } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import { sortBy } from 'lodash'
import debounce from 'lodash/debounce'
import { MouseEventHandler, useEffect, useMemo, useState } from 'react'
import getTtpLocationCity from 'src/http/ttp/get-ttp-location-city'
import getTtpLocationDisplayName from 'src/http/ttp/get-ttp-location-display-name'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import useTtpLocationsQuery from 'src/http/ttp/use-ttp-locations-query'
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

  const { ttpLocations } = useTtpLocationsQuery()

  const fuse = useMemo(() => {
    return new Fuse(ttpLocations || [], {
      keys: ['name', 'nameFull', 'city', 'province', 'country'],
      includeScore: true,
      minMatchCharLength: 2,
    })
  }, [ttpLocations])

  const searchMatches = useMemo(() => {
    if (searchValue) {
      return fuse.search(searchValue).slice(0, 10)
    }

    const locationsSortedByName = sortBy(ttpLocations || [], (loc) => {
      return getTtpLocationDisplayName(loc)
    })

    return searchValue
      ? fuse.search(searchValue)
      : locationsSortedByName.slice(0, 10).map((loc, index) => {
          return {
            item: loc,
            refIndex: index,
            score: 0,
          } as Fuse.FuseResult<TtpLocation>
        })
  }, [fuse, searchValue, ttpLocations])

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
    const selectedTtpLocation = (ttpLocations || []).find((loc) => {
      return loc.id === locId
    })

    if (!selectedTtpLocation) {
      return
    }

    onChange(selectedTtpLocation)
    onClose()
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
          const isActive = index === activeIndex
          const ttpLocation = match.item

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
                {getTtpLocationCity(ttpLocation)}
              </Text>
              <Text
                _groupHover={{ color: 'white' }}
                color={isActive ? 'white' : undefined}
                fontWeight={600}
              >
                {getTtpLocationDisplayName(ttpLocation)}
              </Text>
            </Box>
          )
        })}
      </SearchList>
    </div>
  )
}

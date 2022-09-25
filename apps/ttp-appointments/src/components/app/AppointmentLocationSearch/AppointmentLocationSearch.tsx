import { createAutocomplete } from '@algolia/autocomplete-core'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  IconButton,
  Input,
  Kbd,
  Modal,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import Fuse from 'fuse.js'
import { take } from 'lodash'
import { useMemo, useRef, useState } from 'react'
import { AppointmentLocation } from 'src/api/types/LocationsApi'
import useAppointmentLocationsQuery from 'src/api/useAppointmentLocationsQuery'
import LoadingSpinner from 'src/components/app/Spinner/LoadingSpinner'
import useDetachedAutocompleteKeyboardEvents from './useDetachedAutocompleteKeyboardEvents'

interface LocationSearchProps extends ButtonProps {
  onAppointmentLocationChange: (apptLocation: AppointmentLocation) => void
}

const isAppleDevice = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)

export default function AppointmentLocationSearch({
  onAppointmentLocationChange,
  ...props
}: LocationSearchProps) {
  const modalSize = useBreakpointValue({ base: 'full', md: 'md' })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const [autocompleteState, setAutocompleteState] = useState<any>({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    activeItemId: null,
    status: 'idle',
  })

  useDetachedAutocompleteKeyboardEvents({ isOpen, onOpen, onClose })

  const { appointmentLocationsQuery, appointmentLocations } =
    useAppointmentLocationsQuery({
      enabled: isOpen,
    })

  const fuse = useMemo(() => {
    return new Fuse(appointmentLocations || [], {
      keys: ['name', 'nameShort', 'city', 'province'],
      includeScore: true,
      minMatchCharLength: 2,
    })
  }, [appointmentLocations])

  const autocomplete = useMemo(() => {
    return createAutocomplete({
      defaultActiveItemId: 0,
      id: 'appointment-location-search',
      placeholder: 'Search for locations',
      getSources: () => {
        return [
          {
            sourceId: 'appointmentLocations',
            getItems: ({ query }) => {
              const matches = fuse.search(query)

              return take(matches, 10)
            },
            onSelect: (params) => {
              const { item: appointmentLocation } = params.item

              if (!appointmentLocation) {
                return
              }

              onAppointmentLocationChange(
                appointmentLocation as AppointmentLocation,
              )
              onClose()
            },
          },
        ]
      },
      onStateChange: ({ state }) => {
        setAutocompleteState(state)
      },
    })
  }, [fuse, onClose, onAppointmentLocationChange])

  return (
    <>
      <Button
        _hover={{ background: 'gray.50' }}
        leftIcon={<SearchIcon />}
        px={4}
        rightIcon={
          <div>
            <Kbd mr={1}>{isAppleDevice ? '⌘' : 'Ctrl'}</Kbd>
            <Kbd>K</Kbd>
          </div>
        }
        size="lg"
        variant="outline"
        width="100%"
        onClick={() => {
          onOpen()
        }}
        {...props}
      >
        <Spacer />
      </Button>

      <Modal isOpen={isOpen} size={modalSize} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={[0, 4]} p={4}>
          <div {...autocomplete.getRootProps()}>
            {/* @ts-ignore */}
            <Flex
              alignItems="center"
              as="form"
              // @ts-ignore
              ref={formRef}
              {...autocomplete.getFormProps({ inputElement: inputRef.current })}
            >
              {appointmentLocationsQuery.isLoading ? (
                <LoadingSpinner size="sm" thickness="2px" width="24px" />
              ) : (
                <SearchIcon boxSize="1.25em" color="teal" />
              )}

              {/* @ts-ignore */}
              <Input
                _focus={{ outline: 'none' }}
                border="none"
                ml={4}
                outline="none"
                p={0}
                ref={inputRef}
                {...autocomplete.getInputProps({
                  inputElement: inputRef.current,
                })}
              />

              <IconButton
                aria-label="Close search menu"
                color="teal"
                icon={<CloseIcon />}
                size="sm"
                variant="ghost"
                onClick={() => {
                  onClose()
                }}
              />
            </Flex>

            {/* On mobile, always set fixed height so the list is scrollable (to show items under mobile keyboard). */}
            {/* @ts-ignore */}
            <Box
              height={['120vh', 'inherit']}
              maxHeight={['inherit', 425]}
              overflowY="auto"
              ref={panelRef}
              {...autocomplete.getPanelProps({})}
            >
              {autocompleteState.collections.map((collection: any) => {
                const { source, items: collectionItems } = collection

                if (collectionItems.length === 0) {
                  return autocompleteState.query?.length > 1 ? (
                    <Flex
                      borderTopColor="gray.200"
                      borderTopWidth="1px"
                      justifyContent="center"
                      mt={2}
                      pt={4}
                    >
                      <Text>No matching locations.</Text>
                    </Flex>
                  ) : null
                }

                if (appointmentLocationsQuery.isLoading) {
                  return (
                    <Flex
                      borderTopColor="gray.200"
                      borderTopWidth="1px"
                      justifyContent="center"
                      mt={2}
                      pt={4}
                    >
                      <LoadingSpinner size="md" thickness="2px" />
                    </Flex>
                  )
                }

                return (
                  <Box
                    as="ul"
                    borderTopColor="gray.200"
                    borderTopWidth="1px"
                    key={source.sourceId}
                    mt={2}
                    pt={4}
                    {...autocomplete.getListProps()}
                  >
                    {collectionItems.map(
                      (collectionItem: any, index: number) => {
                        const { item: appointmentLocation } = collectionItem
                        const isActive =
                          autocompleteState.activeItemId === index

                        return (
                          // @ts-ignore
                          <Box
                            _hover={{ cursor: 'pointer' }}
                            as="li"
                            bgColor={isActive ? 'teal' : undefined}
                            borderRadius={4}
                            data-appt-loc-id={appointmentLocation.id}
                            key={appointmentLocation.id}
                            listStyleType="none"
                            px={4}
                            py={2}
                            {...autocomplete.getItemProps({
                              item: collectionItem,
                              source,
                            })}
                          >
                            <Text
                              color={isActive ? 'gray.300' : 'gray'}
                              fontSize="xs"
                              fontWeight={500}
                            >
                              {appointmentLocation.city},{' '}
                              {appointmentLocation.province}
                            </Text>
                            <Text
                              color={isActive ? 'white' : undefined}
                              fontWeight={600}
                            >
                              {appointmentLocation.name ||
                                appointmentLocation.nameShort}
                            </Text>
                          </Box>
                        )
                      },
                    )}
                  </Box>
                )
              })}
            </Box>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

import { SettingsIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuProps,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { MouseEventHandler, useState } from 'react'
import TtpApi from 'src/http/ttp-api'
import updateTtpApiListResponse from 'src/http/update-ttp-api-list-response'
import { TtpUserTrip } from 'src/models/ttp-user-trip/ttp-user-trip'
import TtpUserTripDeleteFormModal from 'src/models/ttp-user-trip/ttp-user-trip-delete-form/ttp-user-trip-delete-form-modal'
import TtpUserTripDisableFormModal from 'src/models/ttp-user-trip/ttp-user-trip-disable-form/ttp-user-trip-disable-form-modal'
import TtpUserTripEditFormModal from 'src/models/ttp-user-trip/ttp-user-trip-edit-form/ttp-user-trip-edit-form-modal'
import TtpUserTripEnableFormModal from 'src/models/ttp-user-trip/ttp-user-trip-enable-form/ttp-user-trip-enable-form-modal'

enum TtpUserTripAction {
  Edit = 'tus-action-edit',
  Enable = 'tus-action-enable',
  Disable = 'tus-action-disable',
  Delete = 'tus-action-delete',
}

export interface TtpUserTripActionMenuProps {
  menuButtonProps?: MenuButtonProps
  menuProps?: MenuProps
  ttpUserTrip: TtpUserTrip.IndexRecord
}

export default function TtpUserTripActionMenu({
  menuButtonProps,
  menuProps,
  ttpUserTrip,
}: TtpUserTripActionMenuProps) {
  const queryClient = useQueryClient()

  const [activeAction, setActiveAction] = useState<TtpUserTripAction | null>(
    null,
  )

  const handleMenuListClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const menuItem = event.target as HTMLButtonElement
    const actionId = menuItem.getAttribute('data-id')

    if (!actionId) {
      return
    }

    switch (actionId as TtpUserTripAction) {
      case TtpUserTripAction.Edit:
      case TtpUserTripAction.Enable:
      case TtpUserTripAction.Disable:
      case TtpUserTripAction.Delete:
        setActiveAction(actionId as TtpUserTripAction)
        break

      default:
        break
    }
  }

  return (
    <>
      <Menu isLazy {...menuProps}>
        <MenuButton
          as={IconButton}
          colorScheme="gray"
          icon={<SettingsIcon />}
          size="sm"
          variant="ghost"
          {...menuButtonProps}
        />

        <MenuList onClick={handleMenuListClick}>
          <MenuItem data-id={TtpUserTripAction.Edit}>Edit</MenuItem>

          {!ttpUserTrip.isEnabled && (
            <MenuItem data-id={TtpUserTripAction.Enable}>Enable</MenuItem>
          )}

          {ttpUserTrip.isEnabled && (
            <MenuItem data-id={TtpUserTripAction.Disable}>Disable</MenuItem>
          )}

          <MenuItem data-id={TtpUserTripAction.Delete}>Delete</MenuItem>
        </MenuList>
      </Menu>

      {activeAction === TtpUserTripAction.Edit && (
        <TtpUserTripEditFormModal
          ttpUserTrip={ttpUserTrip}
          onClose={(context) => {
            if (context.type === 'success') {
              queryClient.setQueryData(
                [TtpApi.userTripsUrl()],
                updateTtpApiListResponse({
                  actionType: 'replace',
                  record: context.result.record,
                }),
              )
            }

            setActiveAction(null)
          }}
        />
      )}

      {activeAction === TtpUserTripAction.Enable && (
        <TtpUserTripEnableFormModal
          ttpUserTrip={ttpUserTrip}
          onClose={(context) => {
            if (context.type === 'success') {
              queryClient.setQueryData(
                [TtpApi.userTripsUrl()],
                updateTtpApiListResponse({
                  actionType: 'replace',
                  record: context.result.record,
                }),
              )
            }

            setActiveAction(null)
          }}
        />
      )}

      {activeAction === TtpUserTripAction.Disable && (
        <TtpUserTripDisableFormModal
          ttpUserTrip={ttpUserTrip}
          onClose={(context) => {
            if (context.type === 'success') {
              queryClient.setQueryData(
                [TtpApi.userTripsUrl()],
                updateTtpApiListResponse({
                  actionType: 'replace',
                  record: context.result.record,
                }),
              )
            }

            setActiveAction(null)
          }}
        />
      )}

      {activeAction === TtpUserTripAction.Delete && (
        <TtpUserTripDeleteFormModal
          ttpUserTrip={ttpUserTrip}
          onClose={(result) => {
            if (result.type === 'success') {
              queryClient.setQueryData(
                [TtpApi.userTripsUrl()],
                updateTtpApiListResponse({
                  actionType: 'remove',
                  record: ttpUserTrip,
                }),
              )
            }

            setActiveAction(null)
          }}
        />
      )}
    </>
  )
}

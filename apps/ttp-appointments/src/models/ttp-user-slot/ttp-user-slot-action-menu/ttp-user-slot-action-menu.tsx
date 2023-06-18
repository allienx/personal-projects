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
import { TtpApiListResponse } from 'src/http/ttp-api-response'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import TtpUserSlotDeleteFormModal from 'src/models/ttp-user-slot/ttp-user-slot-delete-form/ttp-user-slot-delete-form-modal'

enum TtpUserSlotAction {
  Edit = 'tus-action-edit',
  Enable = 'tus-action-enable',
  Disable = 'tus-action-disable',
  Delete = 'tus-action-delete',
}

export interface TtpUserSlotActionMenuProps {
  menuButtonProps?: MenuButtonProps
  menuProps?: MenuProps
  ttpUserSlot: TtpUserSlot.IndexRecord
}

export default function TtpUserSlotActionMenu({
  menuButtonProps,
  menuProps,
  ttpUserSlot,
}: TtpUserSlotActionMenuProps) {
  const queryClient = useQueryClient()

  const [activeAction, setActiveAction] = useState<TtpUserSlotAction | null>(
    null,
  )

  const handleMenuListClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const menuItem = event.target as HTMLButtonElement
    const actionId = menuItem.getAttribute('data-id')

    if (!actionId) {
      return
    }

    switch (actionId as TtpUserSlotAction) {
      case TtpUserSlotAction.Edit:
      case TtpUserSlotAction.Enable:
      case TtpUserSlotAction.Disable:
      case TtpUserSlotAction.Delete:
        setActiveAction(actionId as TtpUserSlotAction)
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
          <MenuItem data-id={TtpUserSlotAction.Edit}>Edit</MenuItem>

          {!ttpUserSlot.isEnabled && (
            <MenuItem data-id={TtpUserSlotAction.Enable}>Enable</MenuItem>
          )}

          {ttpUserSlot.isEnabled && (
            <MenuItem data-id={TtpUserSlotAction.Disable}>Disable</MenuItem>
          )}

          <MenuItem data-id={TtpUserSlotAction.Delete}>Delete</MenuItem>
        </MenuList>
      </Menu>

      {activeAction === TtpUserSlotAction.Delete && (
        <TtpUserSlotDeleteFormModal
          ttpUserSlot={ttpUserSlot}
          onClose={(result) => {
            if (result.type === 'success') {
              queryClient.setQueryData<
                TtpApiListResponse<TtpUserSlot.IndexRecord>
              >([TtpApi.userSlotsUrl()], (data) => {
                if (!data) {
                  return data
                }

                return {
                  ...data,
                  records: data.records.filter(
                    (tus) => tus.id !== ttpUserSlot.id,
                  ),
                }
              })
            }

            setActiveAction(null)
          }}
        />
      )}
    </>
  )
}

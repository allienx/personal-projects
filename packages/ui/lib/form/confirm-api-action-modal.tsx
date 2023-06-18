import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  ThemeTypings,
  useBreakpointValue,
} from '@chakra-ui/react'
import { AxiosRequestConfig } from 'axios'
import { ReactNode } from 'react'
import HttpClient from '../http/http-client'
import useApiForm from './use-api-form'

export type FormDialogCloseSuccess<D> = {
  type: 'success'
  result: D
}

export type FormDialogCloseCancel = {
  type: 'cancel'
}

export type FormDialogClose<D> =
  | FormDialogCloseSuccess<D>
  | FormDialogCloseCancel

type ConfirmApiActionFormOpts = ReturnType<typeof getInitialValues>

export interface ConfirmApiActionModalProps<D> {
  colorScheme?: ThemeTypings['colorSchemes']
  ctaNo: string
  ctaYes: string
  httpClient: HttpClient
  httpConfig: AxiosRequestConfig<any>
  modalFooterProps?: ModalFooterProps
  modalProps?: Omit<ModalProps, 'isOpen' | 'onClose' | 'children'>
  title: ReactNode
  onClose: (result: FormDialogClose<D>) => void
  children: ReactNode
}

export default function ConfirmApiActionModal<D = any>({
  colorScheme = 'teal',
  ctaNo,
  ctaYes,
  httpClient,
  httpConfig,
  modalFooterProps,
  modalProps,
  title,
  onClose,
  children,
}: ConfirmApiActionModalProps<D>) {
  const modalSize = useBreakpointValue({ base: 'full', md: 'md' })

  const { formState, watch, handleSubmit } = useApiForm<
    ConfirmApiActionFormOpts,
    D
  >({
    httpClient,

    opts: {
      defaultValues: getInitialValues(),
    },

    getHttpConfig: () => {
      return httpConfig
    },

    onSuccess: (result) => {
      onClose({
        type: 'success',
        result: result.httpResponse.data,
      })
    },
  })
  const apiErrorMessage = watch('apiErrorMessage')

  const handleCancel = () => {
    onClose({ type: 'cancel' })
  }

  return (
    <Modal isOpen size={modalSize} onClose={handleCancel} {...modalProps}>
      <ModalOverlay />
      <ModalContent borderRadius={[0, 4]}>
        {typeof title === 'string' ? <ModalHeader>{title}</ModalHeader> : title}
        <ModalCloseButton />

        <form onSubmit={handleSubmit}>
          {apiErrorMessage && (
            <Alert
              alignItems="flex-start"
              flexDirection="row"
              mb={6}
              status="error"
            >
              <div>
                <AlertIcon />
              </div>
              <Box whiteSpace="pre-wrap">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{apiErrorMessage}</AlertDescription>
              </Box>
            </Alert>
          )}

          <Box px={6}>{children}</Box>

          <ModalFooter {...modalFooterProps}>
            <Button onClick={handleCancel}>{ctaNo}</Button>
            <Button
              colorScheme={colorScheme}
              isLoading={formState.isSubmitting}
              ml={3}
              type="submit"
              variant="solid"
            >
              {ctaYes}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

function getInitialValues() {
  return {
    apiErrorMessage: '',
  }
}

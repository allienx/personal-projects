import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ModalFooter,
  ModalFooterProps,
  ThemeTypings,
} from '@chakra-ui/react'
import { AxiosRequestConfig } from 'axios'
import HttpClient from '../http/http-client'
import ApiFormModal, { ApiFormModalProps } from './api-form-modal'
import useApiForm from './use-api-form'

type ConfirmApiActionFormOpts = ReturnType<typeof getInitialValues>

export interface ConfirmApiActionModalProps<D> extends ApiFormModalProps<D> {
  colorScheme?: ThemeTypings['colorSchemes']
  ctaNo: string
  ctaYes: string
  httpClient: HttpClient
  httpConfig: AxiosRequestConfig<any>
  modalFooterProps?: ModalFooterProps
}

export default function ConfirmApiActionModal<D = any>({
  colorScheme = 'teal',
  ctaNo,
  ctaYes,
  httpClient,
  httpConfig,
  modalFooterProps,
  onClose,
  children,
  ...apiFormModalProps
}: ConfirmApiActionModalProps<D>) {
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
    <ApiFormModal onClose={onClose} {...apiFormModalProps}>
      <form onSubmit={handleSubmit}>
        {apiErrorMessage && (
          <Alert
            alignItems="flex-start"
            flexDirection="row"
            mb={4}
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

        {children}

        <ModalFooter px={0} py={4} {...modalFooterProps}>
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
    </ApiFormModal>
  )
}

function getInitialValues() {
  return {
    apiErrorMessage: '',
  }
}

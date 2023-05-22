import { Spinner, SpinnerProps } from '@chakra-ui/react'

interface LoadingSpinnerProps extends SpinnerProps {}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  return <Spinner color="#dd2d44" size="xl" thickness="4px" {...props} />
}

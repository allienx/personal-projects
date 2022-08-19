import { Link, useBoolean } from '@chakra-ui/react'
import type { LinkProps } from '@chakra-ui/react'
import GitHubIcon from '../Icons/GitHubIcon'

export interface NerdLinkProps extends LinkProps {
  label: string
}

export default function NerdLink({ color, label, ...props }: NerdLinkProps) {
  const [isHovering, hoverControls] = useBoolean()

  const text = isHovering
    ? label
        .replace(/o/gi, '0')
        .replace(/l/g, '1')
        .replace(/\+/i, '-')
        .replace(/s/gi, '5')
        .replace(/t/gi, '7')
        .replace(/i/gi, '1')
        .replace(/a/gi, '4')
        .replace(/e/gi, '3')
    : label

  return (
    <Link
      {...props}
      color={color}
      onMouseEnter={hoverControls.on}
      onMouseLeave={hoverControls.off}
    >
      {text}
      <GitHubIcon
        boxSize="1.15em"
        color={color}
        fill="currentColor"
        ml={2}
        mt={-1}
      />
    </Link>
  )
}

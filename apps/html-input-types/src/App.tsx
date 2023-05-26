import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import LogoIcon from 'src/components/Icons/LogoIcon'
import { AboutInfo, PageContent, PageFooter, PageHeader, PageWrapper } from 'ui'

const AvailableHtmlInputTypes = [
  'text',
  'password',
  'number',
  'tel',
  'date',
  'datetime-local',
  'time',
  'email',
  'url',
  'color',
  'checkbox',
  'radio',
  'range',
] as const

type HtmlInputType = (typeof AvailableHtmlInputTypes)[number]

export default function App() {
  const isMobile = useBreakpointValue({ base: true, md: false })

  const [inputType, setInputType] = useState<HtmlInputType>(
    AvailableHtmlInputTypes[0],
  )
  const [inputValue, setInputValue] = useState<any>('')

  const isCheckbox = inputType === 'checkbox'
  const isRadio = inputType === 'radio'
  const isColor = inputType === 'color'

  return (
    <PageWrapper maxWidth={450}>
      <PageHeader
        icon={<LogoIcon boxSize="2em" ml={5} />}
        title="html input types"
      />

      <PageContent
        alignItems="center"
        display="flex"
        flexDirection="column"
        mt={5}
      >
        <Box width={300}>
          <FormControl>
            <FormLabel htmlFor="inputType">Type</FormLabel>
            <Select
              name="inputType"
              value={inputType}
              onChange={(event) => {
                setInputValue('')
                setInputType(event.target.value as HtmlInputType)
              }}
            >
              {AvailableHtmlInputTypes.map((type) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              })}
            </Select>
          </FormControl>

          <Box mt={10}>
            <input
              checked={isCheckbox || isRadio ? inputValue : undefined}
              name={inputType}
              style={{
                width: isMobile && isColor ? 34 : undefined,
                height: 34,
                fontSize: 16,
              }}
              type={inputType}
              value={inputValue}
              onChange={(event) => {
                setInputValue(
                  isCheckbox || isRadio
                    ? event.target.checked
                    : event.target.value,
                )
              }}
            />
          </Box>

          <Box mt={5}>
            <Text as="span">Value:</Text>
            <Box as="span" fontFamily="mono" ml={1}>
              {inputValue.toString()}
            </Box>
          </Box>
        </Box>
      </PageContent>

      <PageFooter>
        <AboutInfo
          githubRepoUrl="https://github.com/allienx/personal-projects/tree/main/apps/html-input-types"
          initialEmoji="🔤"
        />
      </PageFooter>
    </PageWrapper>
  )
}

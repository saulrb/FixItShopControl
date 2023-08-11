import { globalStyles, v } from '@fixitshopcontrol/design-system'
import { createGlobalStyle } from 'styled-components'

import Config from '~/config'

const GlobalStyles = createGlobalStyle`
  ${globalStyles}

  body {
    background-color: ${v('zirconOrMirage')};
    color: ${v('codGrayOrWhite')};
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
`

export default GlobalStyles

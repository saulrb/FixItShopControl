import { buildCSSVariables, getCSSVars, getExtendedNamedColors } from '@fixitshopcontrol/design-system'

const allColors = getExtendedNamedColors({
  codGray: '#151515'
})

const {
  alto,
  white,
  mirage,
  black,
  codGray,
  vulcan,
  zircon,
  gallery,
  westSide,
  midnightBlue,
  christi,
  resolutionBlue,
  colonialWhite,
  dustyGray,
  outerSpace,
  crusoe,
  hacienda,
  shark,
  mineShaft,
  wildSand,
  graySuit,
  emperor,
  lochmara,
  atomicTangerine,
  monaLisa,
  chiffon,
  mexicanRed
} = allColors

const themedColors = {
  atomicTangerineOrWestSide: [atomicTangerine, westSide],
  chiffonOrCrusoe: [chiffon, crusoe],
  monaLisaOrMexicanRed: [monaLisa, mexicanRed],
  whiteOrVulcan: [white, vulcan],
  zirconOrMirage: [zircon, mirage],
  codGrayOrWhite: [codGray, white],
  calendarHeaderColor: [codGray, white],
  calendarDayGridBackground: [white, black],
  calendarDayGridBorderBottom: [gallery, black],
  calendarEventColor: [white, white],
  calendarEventBackground: [westSide, hacienda],
  calendarStartBackground: [midnightBlue, mirage],
  calendarPastBackground: [christi, crusoe],
  calendarNextEventBackground: [resolutionBlue, black],
  calendarTodayBackground: [colonialWhite, outerSpace],
  calendarPreviousMonthColor: [dustyGray, gallery],
  calendarNextMonthColor: [dustyGray, black],
  tableHeaderBackground: [white, black],
  tableHeaderColor: [mineShaft, white],
  tableOddRowBackground: [white, codGray],
  tableEvenRowBackground: [wildSand, shark],
  tableBorderColor: [graySuit, black],
  tableBodyColor: [mineShaft, white],
  tableBodyLinkColor: [emperor, white],
  tableBodyLinkHoverColor: [black, gallery],
  paginationActiveColor: [white, white],
  paginationActiveBackground: [lochmara, shark],
  paginationHoverColor: [white, white],
  paginationHoverBackground: [lochmara, shark],
  paginationLinkColor: [outerSpace, gallery],
  inputColor: [black, white],
  inputBackground: [white, black],
  inputBorderColor: [white, black],
  inputDisabledBackground: [gallery, outerSpace],
  inputPlaceholderColor: [white, white],
  inputHoverBorderColor: [lochmara, shark],
  inputFocusBorderColor: [lochmara, shark],
  inputIconColor: [outerSpace, gallery],
  dialogBackground: [white, mineShaft],
  dialogBorderColor: [outerSpace, black],
  inputWrapperBackground: [white, black],
  inputWrapperBorderColor: [white, black],
  moneyInputColor: [black, white],
  dialogCloseColor: [black, white],
  dayPickerBackground: [white, black],
  dayPickerHeaderColor: [codGray, white],
  dayPickerDayGridBackground: [white, black],
  dayPickerDayGridBorder: [gallery, black],
  dayPickerDayGridBackgroundHover: [midnightBlue, mirage],
  dayPickerDayGridColorHover: [white, white],
  dayPickerDayGridColorTaken: [black, gallery],
  dayPickerDayGridBackgroundTaken: [alto, codGray],
  dayPickerDayGridBackgroundPast: [alto, black],
  dayPickerDayGridBackgroundNextEvent: [alto, black],
  dayPickerDayGridBackgroundToday: [colonialWhite, outerSpace],
  dayPickerDayGridColorPreviousMonth: [dustyGray, gallery],
  dayPickerDayGridColorNextMonth: [dustyGray, outerSpace]
}

const lightVars = buildCSSVariables('light', themedColors, allColors)
const darkVars = buildCSSVariables('dark', themedColors, allColors)

const cssVariables = `
  body.theme--light.dashboard {
    ${getCSSVars(lightVars, true)}
  }

  body.theme--dark.dashboard {
    ${getCSSVars(darkVars, true)}
  }
`

export default cssVariables

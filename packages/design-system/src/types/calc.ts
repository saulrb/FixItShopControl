import { ValueOf } from '@fixitshopcontrol/utils'

export const CalcType = {
  spacing: 'spacing',
  padding: 'padding'
} as const

export type CalcType = ValueOf<typeof CalcType>
export const CalcTypes = Object.keys(CalcType)

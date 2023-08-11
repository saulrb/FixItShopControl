import { ValueOf } from '@fixitshopcontrol/utils'

export const Alignment = {
  left: 'left',
  center: 'center',
  right: 'right'
} as const

export type Alignment = ValueOf<typeof Alignment>

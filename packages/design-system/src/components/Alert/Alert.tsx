import { classGenerator } from '@fixitshopcontrol/utils'
import React, { FC, ReactNode } from 'react'

import { Alignment, Color, Shape } from '../../types'
import { BASE_CLASS_NAME, CSS } from './Alert.styled'

type Props = {
  alignment?: Alignment
  color?: Color
  shape?: Shape
  fullWidth?: boolean
  children?: ReactNode | ReactNode[] | string
}

const AlertComponent: FC<Props> = ({
  alignment = Alignment.left,
  color = Color.primary,
  children,
  shape = Shape.regular,
  ...alertProps
}) => {
  const classes = [alignment, shape, color]

  const classNames = classGenerator({
    ccn: BASE_CLASS_NAME,
    data: classes
  })

  return (
    <CSS.Alert data-component="Alert" className={classNames} {...alertProps}>
      {children}
    </CSS.Alert>
  )
}

export default AlertComponent

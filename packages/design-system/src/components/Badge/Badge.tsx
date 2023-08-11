import { classGenerator } from '@fixitshopcontrol/utils'
import React, { FC, ReactNode } from 'react'

import { Color, Shape } from '../../types'
import { BASE_CLASS_NAME, CSS } from './Badge.styled'

interface IProps {
  color?: Color
  shape?: Shape
  children?: ReactNode | ReactNode[] | string
}

const BadgeComponent: FC<IProps> = ({ children, color = Color.primary, shape = Shape.regular }) => {
  const classes = [shape, color]

  const classNames = classGenerator({
    ccn: BASE_CLASS_NAME,
    data: classes
  })

  return (
    <CSS.Badge data-component="Badge" className={classNames}>
      {children}
    </CSS.Badge>
  )
}

export default BadgeComponent

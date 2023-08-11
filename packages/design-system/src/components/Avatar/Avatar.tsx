import { classGenerator } from '@fixitshopcontrol/utils'
import React, { FC, ReactNode } from 'react'

import { Color, Shape } from '../../types'
import { BASE_CLASS_NAME, CSS } from './Avatar.styled'

type Props = {
  color?: Color
  shape?: Shape
  children?: ReactNode | ReactNode[] | string
}

const AvatarComponent: FC<Props> = ({
  children,
  color = Color.primary,
  shape = Shape.round,
  ...restProps
}) => {
  const classNames = classGenerator({
    ccn: BASE_CLASS_NAME,
    data: [color, shape]
  })

  return (
    <CSS.Avatar className={classNames} {...restProps}>
      {children}
    </CSS.Avatar>
  )
}

export default AvatarComponent

import { classGenerator } from '@fixitshopcontrol/utils'
import React, { FC, ReactNode } from 'react'

import { Color, TextAlign, Typography } from '../../types'
import { BASE_CLASS_NAME, CSS } from './Text.styled'

export interface TextProps {
  align?: TextAlign
  className?: string
  color?: Color
  component?: keyof JSX.IntrinsicElements
  variant?: Typography
  children?: ReactNode | ReactNode[] | string
}

const TextComponent: FC<TextProps> = ({
  align = TextAlign.left,
  children,
  className,
  component = undefined,
  ...restProps
}) => {
  const classNames = classGenerator({
    ccn: BASE_CLASS_NAME,
    data: [align],
    className
  })

  const cpmTag = component

  return (
    <CSS.Text as={cpmTag} className={classNames} {...restProps}>
      {children}
    </CSS.Text>
  )
}

export default TextComponent

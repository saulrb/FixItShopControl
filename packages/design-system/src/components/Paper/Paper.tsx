import { classGenerator } from '@fixitshopcontrol/utils'
import React, { FC, ReactNode } from 'react'

import { BASE_CLASS_NAME, CSS } from './Paper.styled'

interface IProps {
  className?: string
  children?: ReactNode | ReactNode[] | string
}

const Paper: FC<IProps> = ({ children, className }) => {
  const classNames = classGenerator({
    ccn: BASE_CLASS_NAME,
    data: [],
    className
  })

  return <CSS.PaperBase className={classNames}>{children}</CSS.PaperBase>
}

export default Paper

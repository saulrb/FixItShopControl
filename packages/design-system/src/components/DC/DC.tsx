import { is } from '@fixitshopcontrol/utils'
import React, { FC } from 'react'

type Props = {
  path: string
  component?: string
}

let cwd = process.env.PWD
let mode = process.env.SSH_CONNECTION ? 'production' : 'development'

if (is.Browser()) {
  const { props } = (window as any).__NEXT_DATA__
  cwd = props.cwd
  mode = props.mode
}

const DC: FC<Props> = ({ component, path }) => {
  if (mode === 'production') {
    return null
  }

  return (
    <a
      data-component={component || path}
      href={`vscode://file/${cwd}/src${path}`}
      style={{ display: 'none' }}
    >
      Open in VSCode
    </a>
  )
}

export default DC

import { bytesToSize, getFileInfo } from '@fixitshopcontrol/utils'
import React, { FC, Fragment } from 'react'

import Icon from '../Icon'
import { CSS } from './File.styled'

type Props = {
  className?: string
  disabled?: boolean
  hasError?: boolean
  id?: string
  name?: string
  noWrapper?: boolean
  onBlur?(e: any): any
  onChange?(e: any): any
  onClick?(e: any): any
  style?: any
  label?: string
  design?: string
  selectedFile?: any
  maxFileSize?: number
  allowedExtensions?: string[]
}

const File: FC<Props> = (props) => {
  const {
    label = 'Choose a file',
    name = 'file',
    selectedFile = {},
    maxFileSize = 12000000,
    allowedExtensions = ['all']
  } = props
  const file = bytesToSize(selectedFile.size, maxFileSize)
  const maxSize = bytesToSize(maxFileSize, maxFileSize, true)
  const { fileName, extension } = getFileInfo(selectedFile.name)
  const isAllowedExt = allowedExtensions.includes(extension) || allowedExtensions.includes('all')

  return (
    <>
      <div
        className="File"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginTop: '5px',
          marginBottom: '20px'
        }}
      >
        <div>
          <CSS.FileWrapper title={`Max File Size is ${maxSize.size}`}>
            <CSS.Button className="button">
              <Icon type="fas fa-upload" /> {label}
            </CSS.Button>
            <CSS.Input type="file" name={name} id="file" {...props} />
          </CSS.FileWrapper>
        </div>
      </div>

      <CSS.Div>
        <br />
        {selectedFile.name && (
          <CSS.Information>
            {fileName}.
            {isAllowedExt ? (
              <CSS.GoodExt>{extension}</CSS.GoodExt>
            ) : (
              <CSS.InvalidExt>{extension}</CSS.InvalidExt>
            )}{' '}
            (<span style={{ color: file.allowed ? 'green' : 'red' }}>{file.size}</span>)
          </CSS.Information>
        )}

        <CSS.Span>
          <strong>Max File Size is:</strong> {maxSize.size}
        </CSS.Span>
        <br />
        <CSS.Span>
          <strong>Allowed extensions:</strong>{' '}
          {allowedExtensions.map((ext: string, index: number) => (
            <Fragment key={`file-${index}`}>
              {ext === extension ? (
                isAllowedExt ? (
                  <CSS.GoodExt>{ext}</CSS.GoodExt>
                ) : (
                  <CSS.InvalidExt>{ext}</CSS.InvalidExt>
                )
              ) : (
                ext
              )}
              {index < allowedExtensions.length - 1 ? ', ' : ''}
            </Fragment>
          ))}
        </CSS.Span>
      </CSS.Div>
    </>
  )
}

export default File

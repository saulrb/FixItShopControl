import styled from 'styled-components'

export namespace CSS {
  export const FileWrapper = styled.div`
    height: 40px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      .button {
        background-color: #333;
      }
    }
  `
  export const Input = styled.input`
    font-size: 200px;
    cursor: pointer;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
  `

  export const Button = styled.button`
    display: inline-block;
    cursor: pointer;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    z-index: 1;
    border-radius: 5px;
    border: 1px solid #333;
    background-color: #333;
    color: white;
  `

  export const Information = styled.div`
    color: #999;
    font-size: 12px;
    margin-top: 9px;
  `

  export const Span = styled.span`
    color: #ccc;
    font-size: 10px;
    margin-top: 2px;
  `

  export const Div = styled.div`
    margin-top: -40px;
  `

  export const GoodExt = styled.span`
    color: green;
  `

  export const InvalidExt = styled.span`
    color: red;
  `
}

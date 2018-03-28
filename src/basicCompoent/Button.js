import React from 'react'
import {Button} from 'react-bootstrap'
const button = (props) => {
  const { handleClick, style, bsStyle, type, value} = props
  return (
    <Button onClick={handleClick} style={style} bsClass='btn' bsStyle={bsStyle} type={type}>{value}</Button>
  )
}
export default button
import React from 'react'
const Input = (props) => {
  const { handleChange, maxLength, type, value, style} = props
  return (
    <input onChange={handleChange} type={type} value={value} style={style}/>
  )
}
export default Input
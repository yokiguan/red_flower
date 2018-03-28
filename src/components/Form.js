import React, { Component } from 'react'
import Button from '../basicCompoent/Button'
import { Form, FormControl, FormGroup, Col} from 'react-bootstrap'
const form = (props) => {
  const { formItemList, button, style} = props
  return (
    <Form>
      {formItemList.map((item,index) => {
        return (
          <FormGroup controlId={item.controlId} key={index}>
            <Col>{item.label}</Col>
            <Col>
              <FormControl type={item.input.type} placeholder={item.input.placeholder} name={item.input.name} onChange={item.input.handleChange}/>
            </Col>
          </FormGroup>
        )
      })}
      <Button {...button}/>
    </Form>
  )
}
export default form
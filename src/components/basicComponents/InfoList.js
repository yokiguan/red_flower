import React from 'react'
import { Table, } from 'antd'

const InfoList = (props) => {
  return (
    <Table columns={props.column} dataSource={props.dataSource}/>
  )
}

export default InfoList
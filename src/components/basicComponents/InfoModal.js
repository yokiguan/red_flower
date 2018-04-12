import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { GetStuInfo, GetTutorInfo } from '../../API/Api'
import InfoForm from './InfoForm'
import Score from '../Container/Score'

class InfoModal extends Component {
  constructor(props) {
    super(props)
    this.hideModal = this.hideModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.state = {
      visible: false
    }
  }
  componentDidMount() {
    if (typeof this.props.studentId !== 'undefined') {
      GetStuInfo({id: this.props.studentId})
        .then(res => JSON.parse(res))
        .then(res => {
          console.log(res.data)
          this.setState({
            data: res.data
          })
        })
    } else if( typeof this.props.tutorId !== 'undefined') {
      GetTutorInfo({id: this.props.tutorId})
        .then(res => JSON.parse(res))
        .then(res => {
          this.setState({
            data: res.data
          })
        })
    }
  }
  hideModal() {
    this.setState({
      visible: false
    })
  }
  showModal() {
    this.setState({
      visible: true
    })
  }
  render() {
    return (
      <div>
        <Button onClick={this.showModal}>查看详情</Button>
        <Modal
          title='查看详情'
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText='确认'
          cancelText='取消'
        >
          <InfoForm {...this.state.data}/>
          <Score/>
        </Modal>
      </div>
    )
  }
}

export default InfoModal
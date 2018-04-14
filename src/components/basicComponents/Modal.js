import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import InfoForm from './InfoForm'
import ArticleForm from './ArticleForm'
import Score from '../Container/Score'
const Forms = (props) => {
  if (props.mark === 'info') {
    return <InfoForm {...props.infoData}/>
  } else if (props.mark === 'article') {
    return <ArticleForm {...props.infoData}/>
  }
}

class BasicModal extends Component {
  constructor(props) {
    super(props)
    this.hideModal = this.hideModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.state = {
      visible: false
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
          <Forms mark={this.props.mark} infoData={this.props.infoData}/>
        </Modal>
      </div>
    )
  }
}

export default BasicModal
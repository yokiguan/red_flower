import React, { Component } from 'react'
import { Button, Input, Layout, Divider} from 'antd'
import { AccountLogin, GetAuditList} from "../../API/Api";
import Mock from '../../API/Mock/route'

const BannerItem = (props) => {
  console.log(props)
  const BannerItemStyle = {
    container: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      marginTop: 50 + 'px',
      // justifyContent: 'spaceAround'
    },
    image: {
      width: 200 + 'px',
      height: 'auto',
      marginRight: 50 + 'px'
    },
    info: {
      display: 'flex',
      flexFlow: 'column nowrap'
    },
    buttonGroup: {
      marginTop: 15 + 'px'
    },
    buttonGutter: {
      marginRight: 20 + 'px'
    }
  }
  return (
    <div type='flex' gutter={16} style={BannerItemStyle.container}>
      <div>
        <img style={BannerItemStyle.image} src="data:image/png;base64,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"/>
      </div>
      <div style={BannerItemStyle.info}>
        <div>
          <label>标题</label>
          <Input />
        </div>
        <div>
          <label>当前文章</label>
          <Input disabled={true} value='fuck'/>
        </div>
        <div style={BannerItemStyle.buttonGroup}>
          <Button style={BannerItemStyle.buttonGutter}>选择文章</Button>
          <Button style={BannerItemStyle.buttonGutter}>更换图片</Button>
          <Button style={BannerItemStyle.buttonGutter} onClick={props.deleteBannerItem}>清空</Button>
        </div>
      </div>
    </div>
  )
}
class Banner extends Component {
  constructor(props) {
    super(props)
    this.BannerContainerStyle = {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      paddingLeft: 50 + 'px'
    }
    this.state = {
      bannerItems: [1, 2, 3, 4]
    }
    this.deleteBannerItem = this.deleteBannerItem.bind(this)
  }

  deleteBannerItem () {
    // AccountLogin({username: 'hwding', password: 'abc'})
    //   .then(res => JSON.parse(res))
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // GetAuditList({type: 1, status: 1})
    //   .then(res => JSON.parse(res))
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
  render () {
    return (
      <Layout style={this.BannerContainerStyle}>
        {
          this.state.bannerItems.map((item, index) => {
            return (
              <div key={index}>
                <BannerItem deleteBannerItem={this.deleteBannerItem}/>
                <Divider/>
              </div>
            )
          })
        }
      </Layout>
    )
  }
}

export default Banner
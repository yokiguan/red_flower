import React, { Component } from 'react'
import { Button, InputNumber, Layout, Divider, Upload, Icon, message} from 'antd'
import { EditBanner, DownLoad, UpLoad, GetBanner} from "../../API/Api"

class BannerItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleId: props.info,
      imgUrl: ''
    }
    this.upload = {
      name: 'file',
      action: 'https://upload.qiniu.com',
      data: {
        token: '',
        key: 'banner-' + props.index + '.jpg'
      },
      listType: 'picture',
      beforeUpload(file, fileList) {
        return new Promise((resolve, reject) => {
          UpLoad({banner: this.data.key})
            .then(res => {
              this.data.token = res.data
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          console.log(info)
          message.success(`${info.file.name} 图片上传成功`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 图片上传失败.`)
        }
      },
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      articleId: props.info
    })
  }
  handleChangeArticleId = (value) => {
    if (typeof value === 'number') {
      this.setState({
        articleId: value
      })
    }
  }
  updateBanner = () => {
    EditBanner(JSON.stringify({slotId: this.props.index, articleId: this.state.articleId}))
      .then(res => {
        message.success(`更新轮播图${this.props.index}成功`)
      })
      .catch(err => {
        message.error(`更新轮播图${this.props.index}失败, 原因： ${err}`)
      })
  }
  componentDidMount() {
    DownLoad({banner: `banner-${this.props.index}.jpg`})
      .then(res => {
        this.setState({
          imgUrl: res.data
        })
      })
  }
  render() {
    const BannerItemStyle = {
      container: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        marginTop: 50 + 'px',
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
        <img src={this.state.imgUrl} style={BannerItemStyle.image} alt={"当前轮播图" + this.props.index}/>
        <div style={BannerItemStyle.info}>
          <div>
            <label>当前文章ID：</label>
            <InputNumber value={this.state.articleId} onChange={this.handleChangeArticleId}/>
          </div>
          <div style={BannerItemStyle.buttonGroup}>
            <Upload {...this.upload} style={BannerItemStyle.buttonGutter}>
              <Button>
                <Icon type="upload" /> 选择图片
              </Button>
            </Upload>
            <br/>
            <Button style={BannerItemStyle.buttonGutter} onClick={this.updateBanner}>更新</Button>
          </div>
        </div>
      </div>
    )
  }
}
class Banner extends Component {
  constructor(props) {
    super(props)
    this.info = []
    this.bannerItems = [1, 2, 3, 4]
    this.state = {
      info: []
    }
  }
  componentDidMount() {
    GetBanner()
      .then(res => {
        res.data.forEach(item => {
          this.info.push(item.b)
        })
        this.setState({
          info: this.info
        })
      })
  }
  render () {
    const BannerContainerStyle = {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      paddingLeft: 50 + 'px'
    }
    return (
      <Layout style={BannerContainerStyle}>
        {
          this.bannerItems.map((item, index) => {
            return (
              <div key={index}>
                <BannerItem
                  index={item}
                  info={typeof this.state.info[index] !== 'undefined'? this.state.info[index]: 0}
                  />
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
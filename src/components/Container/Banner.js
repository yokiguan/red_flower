import React, { Component } from 'react'
import { Button, Input, Layout, Divider, Upload, Icon, message} from 'antd'
import { EditBanner, DownLoad, UpLoad} from "../../API/Api"

const upload = {
  name: 'file',
  action: 'https://upload.qiniu.com',
  data: {
    token: 'aR-WdsJF_UFOOomRrPGFZyEzllWEYuSW1ZEfiHVt:N2jYo3MnkaUmUZHeOlNrtlJv-uY=:eyJzY29wZSI6InJlZGZsb3dlcjpiYW5uZXItMS5qcGciLCJkZWFkbGluZSI6MTUyNDI4NjgwOX0=',
    key: 'banner-1.jpg'
  },
  listType: 'picture',
  beforeUpload(file, fileList) {
    console.log('上传文件')
    console.log(file, fileList)
    console.log('上传成功')
    return true
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


const BannerItem = (props) => {
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
      <div style={BannerItemStyle.info}>
        <div>
          <label>当前文章ID</label>
          <Input value='2'/>
        </div>
        <div style={BannerItemStyle.buttonGroup}>
          <Upload {...upload} style={BannerItemStyle.buttonGutter}>
            <Button>
              <Icon type="upload" /> 选择图片
            </Button>
          </Upload>
          <br/>
          <Button style={BannerItemStyle.buttonGutter} onClick={props.deleteBannerItem}>更新</Button>
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
  componentDidMount() {
    EditBanner(JSON.stringify({slotId: 1, articleId: 11}))
      .then(res => JSON.parse(res))
      .then(res => {
        console.log(res)
      })
  }
  deleteBannerItem () {
    EditBanner({slotId: 1, articleId: 50})
      .then(res => JSON.parse(res))
      .then(res => {
        console.log(res)
      })
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
import React, { Component } from 'react'
import { Input} from 'antd'
import { articleData} from "../data/dataMap"
import {transformTime} from "../../common/scripts/utils"

const isArticleElement = (item) => {
  return item[1] !== null && Object.keys(articleData).indexOf(item[0]) !== -1
}
class ArticleForm extends Component {
  constructor(props) {
    super(props)
    this.ArticleData = Object.entries(props).filter(item => isArticleElement(item))
  }
  render() {
    return (
      <section>
        <h3>文章详情</h3>
        <div>
          {
            this.ArticleData.map((item) => {
              switch (item[0]) {
                case 'createTime':
                  return (
                    <div key={item[0]}>
                      <label>{articleData[item[0]]}：</label><Input value={transformTime(item[1])} disabled={true}/>
                    </div>
                  )
                  break
                case 'content':
                  return (
                    <div key={item[0]}>
                      <label>{articleData[item[0]]}：</label><Input.TextArea autosize={true} value={item[1]}  disabled={true}/>
                    </div>
                  )
                  break
                default:
                  return (
                    <div key={item[0]}>
                      <label>{articleData[item[0]]}：</label><Input value={item[1]} disabled={true}/>
                    </div>
                  )
              }
            })
          }
        </div>
      </section>
    )
  }
}

export default ArticleForm
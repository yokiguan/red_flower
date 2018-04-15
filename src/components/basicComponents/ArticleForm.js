import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Input} from 'antd'
import { articleData} from "../data/dataMap"
import {transformTime} from "../../common/scripts/utils"

const isArticleElement = (item) => {
  console.log(Object.keys(articleData))
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
        <h4 style={{textAlign: 'center'}}>{this.ArticleData[0][1]}</h4>
        <ReactQuill
          value= {this.ArticleData[1][1]}
        />
      </section>
    )
  }
}

export default ArticleForm
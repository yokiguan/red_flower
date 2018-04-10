import React, { Component } from 'react'
import { Divider} from 'antd'
import OptionList from './OptionList'

export default class OptionLists extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const school = {
      title: '学校',
      info: '说明：1、此处的学校名跟用户“编辑个人资料”中的选项和“导学”中联动下拉框的筛选关联，请谨慎添加和修改。\n' +
      '\n' +
      '         2、删除会导致已选择该学校的用户的资料中，“学校”一栏数据消失。建议仅在该分类用户不再使用“海鲸小\n' +
      '\n' +
      '              红花”时删除该分类。'
    }
    const trade = {
      title: '行业',
      info: '说明：1、此处的“行业”跟用户“编辑个人资料”中的选项和“导学”中联动下拉框的筛选关联，请谨慎添加和修改。\n' +
      '\n' +
      '         2、删除会导致已选择该学校的用户的资料中，“行业”一栏数据消失。建议仅在该分类用户不再使用“海鲸小\n' +
      '\n' +
      '              红花”时删除该分类。'
    }
    const direction = {
      title: '申请方向',
      info: '说明：1、此处的“申请方向”跟用户“编辑个人资料”中的选项关联，请谨慎添加和修改。\n' +
      '\n' +
      '         2、删除会导致已选择该学校的用户的资料中，“行业”一栏数据消失。'
    }
    return (
      <section>
        <br/>
        <h3>下拉列表框</h3>
        <p>基础设置涉及用户多项基本数据，请谨慎修改</p>
        <Divider/>
        <OptionList data={school}/>
        <Divider/>
        <OptionList data={trade}/>
        <Divider/>
        <OptionList data={direction}/>
      </section>
    )
  }
}
import React, { Component } from 'react'
import { Divider} from 'antd'
import OptionList from './OptionList'

export default class OptionLists extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

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
    const question = {
      title: '问题',
      info: '说明：1、此处的问题即是学生用户“编辑个人资料”中需要回答的问题。\n' +
      '\n' +
      '         2、删除一个问题，会导致已该问题及相关所有用户答案被删除，请谨慎删除。\n' +
      '\n' +
      '         3、修改一个问题，会修改用户看到的问题题干，不会改变用户相应问题下的答案。'
    }
    return (
      <section>
        <br/>
        <h3>下拉列表框/问题</h3>
        <p>基础设置涉及用户多项基本数据，请谨慎修改</p>
        <Divider/>
        <OptionList data={school} kind='school'/>
        <Divider/>
        <OptionList data={trade} kind='trade'/>
        <Divider/>
        <OptionList data={direction} kind='direction'/>
        <Divider/>
        <OptionList data={question} kind='question'/>
      </section>
    )
  }
}
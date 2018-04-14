import React, { Component } from 'react'
import Option from '../basicComponents/Option'
import { GetSchoolList, GetDirectionList, GetTradeList, AddTradeList, AddSchoolList, AddDirectionList, EditTradeList, EditSchoolList, EditDirectionList, DeleteSchoolList, DeleteTradeList, DeleteDirectionList, GetQuestionList, AddProblemList, DeleteQuestionList, EditQuestionList } from "../../API/Api"
import { judgePushAjax } from '../../common/scripts/utils'
const asyncOption = {
  direction: {
    'get': GetDirectionList,
    'put': EditDirectionList,
    'post': AddDirectionList,
    'delete': DeleteDirectionList
  },
  school: {
    'get': GetSchoolList,
    'put': EditSchoolList,
    'post': AddSchoolList,
    'delete': DeleteSchoolList
  },
  trade: {
    'get': GetTradeList,
    'put': EditTradeList,
    'post': AddTradeList,
    'delete': DeleteTradeList
  },
  question: {
    'get': GetQuestionList,
    'put': EditQuestionList,
    'post': AddProblemList,
    'delete': DeleteQuestionList
  }
}
export default class OptionList extends Component{
  constructor(props) {
    super(props)
    this.state = {
      listData: [],
      listDataLength: 0
    }
  }
  GetData = (asyncFunc, value) => {
    asyncFunc()
      .then(res => JSON.parse(res))
      .then(res => {
        if (typeof res.code !== 'undefined' && res.code === 0 && res.data.length > 0) {
          const list = []
          res.data.map(item => {
            list.push({
              id: item.id,
              value: item[value + 'Name'] || item.title
            })
          })
          this.setState({
            listData: list,
            listDataLength: list.length
          })
        }
      })
  }
  handleChange = (newState) => {
    this.setState({
      listData: newState
    })
  }
  handleDelete = (id) => {
    asyncOption[this.props.kind]['delete']({id: id})
      .then(res => JSON.parse(res))
      .then(res => {
        judgePushAjax()
      })
  }
  handleUpdate = (source) => {
    let data = {}
    if (typeof source.id === 'undefined' || source.id.toString().length > 10) {
      data[this.props.kind] = source.value
      asyncOption[this.props.kind]['post'](JSON.stringify(data))
        .then(res => JSON.parse(res))
        .then(res => {
          judgePushAjax()
        })
    } else {
      data.value = {
        [this.props.kind]: source.value
      }
      data['id'] = source.id
      asyncOption[this.props.kind]['put'](data)
    }
  }
  componentDidMount() {
    this.GetData(asyncOption[this.props.kind]['get'], this.props.kind)
  }
  render() {
    return(
      <section style={{padding: 20 + 'px'}}>
        <h4>{this.props.data.title}</h4>
        <p>{this.props.data.info}</p>
        <Option data={this.state.listData} edit={this.handleChange} delete={this.handleDelete} update={this.handleUpdate}/>
      </section>
    )
  }
}
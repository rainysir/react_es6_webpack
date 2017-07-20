/**
 * Created by XiaoYu on 2017/6/19.
 */
import React, {Component} from 'react';
import { Form } from 'antd';
import './style.scss';
import TimeRelatedForm from './shared_form';
import SharedList from './shared_table';
import SharedModel from '../../../models/sharedData';
const SharedData = new SharedModel();
const WrappedTimeRelatedForm = Form.create()(TimeRelatedForm);
export default class Shared extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus:false,
      condition: {
        currentPage:1,
        pageSize:10
      },
      result: {
        resultList:[],
        total:0
      }
    };
    this.search = this.search.bind(this);
  }

  componentDidMount = () => {
    this.getSharedList();
  };

  changeLoading = (boolean = false) => {
    this.setState({
      loadingStatus:boolean
    })
  };
  search(conditions){
    this.setCondition(conditions);
    this.getSharedList();
  };
  changePage = (page) => {
    this.state.condition.currentPage = page;
    this.getSharedList();
  };
  //搜索条件
  setCondition = (values) => {
    const t = this;
    let searchCondition = {
      currentPage:1,
      pageSize:10
    };
    values.userId && (searchCondition.userId = values.userId);
    values.objectId && (searchCondition.objectId = values.objectId);
    values['range-picker'] && (searchCondition.createStartDate = values['range-picker'][0]);
    values['range-picker'] && (searchCondition.createEndDate = values['range-picker'][1]);
    t.state.condition = searchCondition;
  };
  getSharedList = () => {
    const t = this,
          condition = this.state.condition;
    t.changeLoading(true);
    SharedData.sharedList(condition).then(data => {
      t.changeLoading(false);
      if(data.ok && data.dataMap){
        const result = data.dataMap;
        this.setState({
          result:result
        });
      }
    });

  };

  render() {
    return (
      <div className="comment_wrap">
        <div className="title">查询条件</div>
        <div className="formWrap">
          <WrappedTimeRelatedForm ref='form_component' search = { this.search } />
        </div>
        <div className="title">查询结果</div>
        <SharedList
          ref="table_component"
          status = { this.state.loadingStatus }
          refreshList = { this.getSharedList }
          result = { this.state.result }
          changePage = { this.changePage }
          condition = { this.state.condition }
        />
      </div>
    )
  }
}

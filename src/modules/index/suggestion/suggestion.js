/**
 * Created by XiaoYu on 2017/6/19.
 */
import React, {Component} from 'react';
import { Form } from 'antd';
import './style.scss';
import TimeRelatedForm from './suggestion_form';
import SuggestionList from './suggestion_table';
import SuggestionModel from '../../../models/suggestionData';
const SuggestionData = new SuggestionModel();
const WrappedTimeRelatedForm = Form.create()(TimeRelatedForm);
export default class Suggestion extends Component {
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
    this.getSuggestionList();
  };

  changeLoading = (boolean = false) => {
    this.setState({
      loadingStatus:boolean
    })
  };
  search(conditions){
    this.setCondition(conditions);
    this.getSuggestionList();
  };
  changePage = (page) => {
    this.state.condition.currentPage = page;
    this.getSuggestionList();
  };
  //搜索条件
  setCondition = (values) => {
    const t = this;
    let searchCondition = {
      currentPage:1,
      pageSize:10
    };
    //用户ID
    values.userId && (searchCondition.userId = values.userId);
    // 反馈类型
    values.type && (searchCondition.type = values.type);
    //联系方式
    values.mobile && (searchCondition.mobile = values.mobile);
    values.status && (searchCondition.status = values.status);
    values.questionType && (searchCondition.questionType = values.questionType);
    values['range-picker'] && (searchCondition.createStartDate = values['range-picker'][0]);
    values['range-picker'] && (searchCondition.createEndDate = values['range-picker'][1]);
    values['range-picker2'] && (searchCondition.replyStartDate = values['range-picker2'][0]);
    values['range-picker2'] && (searchCondition.replyEndDate = values['range-picker2'][1]);
    //回复时间段----
    t.state.condition = searchCondition;
  };
  getSuggestionList = () => {
    const t = this,
          condition = this.state.condition;
    t.changeLoading(true);
    SuggestionData.suggestionList(condition).then(data => {
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
        <SuggestionList
          ref="table_component"
          status = { this.state.loadingStatus }
          refreshList = { this.getSuggestionList }
          result = { this.state.result }
          changePage = { this.changePage }
          condition = { this.state.condition }
        />
      </div>
    )
  }
}

/**
 * Created by XiaoYu on 2017/6/19.
 */
import React, {Component} from 'react';
import { Form } from 'antd';
import './style.scss';
import TimeRelatedForm from './result_form';
import ResultList from './result_table';
import ResultModel from '../../../models/resultData';
const ResultData = new ResultModel();
const WrappedTimeRelatedForm = Form.create()(TimeRelatedForm);
export default class Result extends Component {
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
    this.getResultList();
  };

  changeLoading = (boolean = false) => {
    this.setState({
      loadingStatus:boolean
    })
  };
  search(conditions){
    this.setCondition(conditions);
    this.getResultList();
  };
  changePage = (page) => {
    this.state.condition.currentPage = page;
    this.getResultList();
  };
  //搜索条件
  setCondition = (values) => {
    const t = this;
    let searchCondition = {
      currentPage:1,
      pageSize:10
    };
    values.name && (searchCondition.name = values.name);
    values.code && (searchCondition.code = values.code);
    values.minScore && (searchCondition.minScore = values.minScore);
    values.maxScore && (searchCondition.maxScore = values.maxScore);
    t.state.condition = searchCondition;
  };
  getResultList = () => {
    const t = this,
      condition = this.state.condition;
    t.changeLoading(true);
    ResultData.resultList(condition).then(data => {
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
        <ResultList
          ref="table_component"
          status = { this.state.loadingStatus }
          refreshList = { this.getResultList }
          result = { this.state.result }
          changePage = { this.changePage }
          condition = { this.state.condition }
        />
      </div>
    )
  }
}

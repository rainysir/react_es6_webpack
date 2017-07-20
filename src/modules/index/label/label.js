/**
 * Created by chao on 2017/6/27.
 * @author chaouxeling
 * @date 2017-06-27
 * @desc 标签组件
 */
import React, {Component} from 'react';
import { Form } from 'antd';
import './style.scss';
import TimeRelatedForm from './label_form';
import LabelList from './label_table';
import LabelData from '../../../models/LabelData';
const LabelDataTool = new LabelData();
const WrappedTimeRelatedForm = Form.create()(TimeRelatedForm);
export default class Label extends Component {
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
    this.getLabelList();
  };

  changeLoading = (boolean = false) => {
    this.setState({
      loadingStatus:boolean
    })
  };
  search(conditions){
    this.setCondition(conditions);
    this.getLabelList();
  };
  changePage = (page) => {
    this.state.condition.currentPage = page;
    this.getLabelList();
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
    values.objectType && (searchCondition.objectType = values.objectType);
    values['range-picker'] && (searchCondition.createStartDate = values['range-picker'][0]);
    values['range-picker'] && (searchCondition.createEndDate = values['range-picker'][1]);
    t.state.condition = searchCondition;
  };
  getLabelList = () => {
    const t = this,
      condition = this.state.condition;
    t.changeLoading(true);
    LabelDataTool.lableList(condition).then(data => {
        if(data.ok && data.dataMap){
          const result = data.dataMap;
          t.changeLoading(false);
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
          <WrappedTimeRelatedForm  ref='form_component' search = { this.search }/>
        </div>
        <div className="title">查询结果</div>
        <LabelList
          ref="table_component"
          status = { this.state.loadingStatus }
          refreshList = { this.getLabelList }
          result = { this.state.result }
          changePage = { this.changePage }
          condition = { this.state.condition }
        />
      </div>
    )
  }
}

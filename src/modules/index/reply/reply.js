/**
 * Created by XiaoYu on 2017/6/19.
 */
import React, {Component} from 'react';
import { Form } from 'antd';
import './style.scss';
import ReplyForm from './reply_form';
import ReplyList from './reply_table';
import ReplyModel from '../../../models/replyData';
const WrappedReplyForm = Form.create()(ReplyForm);
const ReplyData = new ReplyModel();
export default class Reply extends Component {
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
    this.getReplytList();
  };

  changeLoading = (boolean = false) => {
    this.setState({
      loadingStatus:boolean
    })
  };
  search(conditions){
    this.setCondition(conditions);
    this.getReplytList();
  };
  changePage = (page) => {
    this.state.condition.currentPage = page;
    this.getReplytList();
  };
  //搜索条件
  setCondition = (values) => {
    const t = this;
    let searchCondition = {
      currentPage:1,
      pageSize:10
    };
    values.reviewId && (searchCondition.reviewId = values.reviewId);
    values.replyId && (searchCondition.replyId = values.replyId);
    values.replyXingMing && (searchCondition.replyXingMing = values.replyXingMing);
    values.content && (searchCondition.content = values.content);
    values['range-picker'] && (searchCondition.createStartDate = values['range-picker'][0]);
    values['range-picker'] && (searchCondition.createEndDate = values['range-picker'][1]);
    t.state.condition = searchCondition;
  };
  getReplytList = () => {
    const t = this,
      condition = this.state.condition;
    t.changeLoading(true);
    ReplyData.replyList(condition).then(data => {
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
          <WrappedReplyForm ref='form_component' search = { this.search } />
        </div>
        <div className="title">查询结果</div>
        <ReplyList
          ref="table_component"
          status = { this.state.loadingStatus }
          refreshList = { this.getReplytList }
          result = { this.state.result }
          changePage = { this.changePage }
        />
      </div>
    )
  }
}

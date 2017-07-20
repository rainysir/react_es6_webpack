/**
 * Created by XiaoYu on 2017/6/19.
 * 点评列表
 */
import React, { Component } from 'react';
import { Table, Button, Modal, Input, Form, Popconfirm } from 'antd';
import { Map, List } from 'immutable';
import CommentModel from '../../../models/reviewData';
import CommonFun from '../../../components/util/utils';//公共方法
const reviewData = new CommentModel();
class ModalLook extends Component {
  render() {
    const detail = this.props.detail;
    return (
      <div>
        <div className="input_item">
          <label>点评对象代码:</label>
          <p>{ detail.objectType }</p>
        </div>
        <div className="input_item">
          <label>点评对象ID:</label>
          <p>{ detail.objectId }</p>
        </div>
        <div className="input_item">
          <label>点评对象名称:</label>
          <p>{ detail.objectName }</p>
        </div>
        <div className="input_item">
          <label>评论:</label>
          <p>{ detail.comment }</p>
        </div>
        <div className="input_item">
          <label>总分:</label>
          <p>{ detail.score }</p>
        </div>
        <div className="input_item">
          <label>创建日期:</label>
          <p>{ detail.createDateText }</p>
        </div>
        <div className="input_item">
          <label>用户对象:</label>
          <p>{ detail.userObject }</p>
        </div>
        <div className="input_item">
          <label>用户ID:</label>
          <p>{ detail.userId }</p>
        </div>
        <div className="input_item">
          <label>昵称:</label>
          <p>{ detail.nickName }</p>
        </div>
        <div className="input_item">
          <label>上线状态:</label>
          <p>{ detail.showState }</p>
        </div>
        <div className="input_item">
          <label>显示:</label>
          <p>{ detail.statusState }</p>
        </div>
      </div>
    )
  }
}
class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {title: '点评对象代码', dataIndex: 'objectType', key: 'objectType', width: 150},
      {title: '点评对象ID', dataIndex: 'objectId', key: 'objectId', width: 150},
      {title: '点评对象名称', dataIndex: 'objectName', key: 'objectName', width: 150},
      {title: '评论', dataIndex: 'comment', key: 'comment', width: 500},
      {title: '总分', dataIndex: 'score', key: 'score', width: 80},
      {title: '创建日期', dataIndex: 'createDateText', key: 'createDateText', width: 150},
      {title: '用户对象', dataIndex: 'userObject', key: 'userObject', width: 100},
      {title: '用户ID', dataIndex: 'userId', key: 'userId', width: 150},
      {title: '昵称', dataIndex: 'nickName', key: 'nickName', width: 100},
      {title: '上线状态', dataIndex: 'showState', key: 'showState', width: 50},
      {title: '显示', dataIndex: 'statusState', key: 'statusState', width: 100},
      {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record, index) => {
          return (
            <div>
              <a className="operationBtn" onClick={ this.modelTool().showModal.bind(this , text, 'look') }
                 href="javascript:;">查看</a>
            </div>
          )
        }
      }
    ];

    this.state = {
      dataSource: [],
      currentPage: 1,
      visible: false,
      dataDetail: {
        key: '',
        name: '',
        age: '',
        address: ''
      },
      newKey: 1,
      detailState: '',
      selectedRowKeys:[]
    };


  }

  //数据转换
  convert() {
    const result = this.props.result.resultList;
    const res = result.map((item, index)=> {
      return {
        key: item.id,
        showState: item.showData ? "上线" : "下线",
        statusState:item.status==0?"是":"否",
        createDateText: CommonFun.dateFormat('yyyy年MM月dd日', item.createDate),
        ...item
      }
    });
    return res;
  }
  //事件
  initEvent = () => {
    return {
      //上线
      upLine: () => {
        const ids = this.state.selectedRowKeys.toString();
        reviewData.upReview('?ids='+ids).then(data => {
          if(data.ok){
            this.props.refreshList();
            this.setState({
              selectedRowKeys:[]
            });
          }
        });
      },
      //下线
      downLine: () => {
        const ids = this.state.selectedRowKeys.toString();
        reviewData.downReview('?ids='+ids).then(data => {
          if(data.ok){
            this.props.refreshList();
            this.setState({
              selectedRowKeys:[]
            });
          }
        });
      }
    }
  };
  //弹层
  modelTool = () => {
    return {
      showModal: (data, type) => {
        this.setState({
          visible: true,
          dataDetail: data,
          newKey: ++this.state.newKey,
          detailState: type
        });
      },
      //弹层返回
      handleCancel: () => {
        this.setState({
          visible: false,
        });
      }
    }
  };


  render() {
    const { currentPage,selectedRowKeys } = this.state;
    const columns = this.columns;
    const result = this.convert();
    const paginationOption = {
      current: this.props.condition.currentPage,
      total: this.props.result.total,
      onChange: (page) => {
        this.props.changePage(page);
        this.setState({
          currentPage: page
        });
      }
    };
    //table配置
    const option = {
      rowSelection: {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({ selectedRowKeys });
        }
      }
    };

    const ModalComponent = <ModalLook detail={ this.state.dataDetail }/>;
    return (
      <div>
        <Form>
          <Modal
            className={ (this.state.detailState == 'look') ? 'lookModal' : '' }
            key={ this.state.newKey }
            title={ (this.state.detailState == 'add') ? '添加' : this.state.dataDetail.name }
            visible={ this.state.visible }
            onOk={ (this.state.detailState == 'add') ? this.modelTool().addHandleOk : this.modelTool().handleOk }
            onCancel={ this.modelTool().handleCancel }
            width={'60%'}
          >
            { ModalComponent }
          </Modal>
        </Form>
        <Button style={{ margin:'20px 10px 5px 0' }} type="primary" onClick={ this.initEvent().upLine }>上线</Button>
        <Button style={{ margin:'20px 0 5px 0' }} type="primary" onClick={ this.initEvent().downLine }>下线</Button>
        <p style={{ marginBottom:'10px',fontSize:'12px' }}>
          共计{ this.props.result.total }条，每页显示{ 10 }条，当前显示为第{ currentPage }页</p>
        <Table pagination={ paginationOption } loading={ this.props.status } { ...option } columns={ columns }
               dataSource={ result }
        />
      </div>
    );
  }
}


export default Form.create()(ReviewList);

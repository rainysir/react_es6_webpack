/**
 * Created by XiaoYu on 2017/6/19.
 * 点评列表
 */
import React, { Component } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';
import ReplyModel from '../../../models/replyData';
import CommonFun from '../../../components/util/utils';//公共方法
const FormItem = Form.Item;
const ReplyData = new ReplyModel();

class ModalLook extends Component {
  render() {
    const detail = this.props.detail;
    return (
      <div>
        <div className="input_item">
          <label>点评ID:</label>
          <p>{ detail.reviewId }</p>
        </div>
        <div className="input_item">
          <label>创建日期:</label>
          <p>{ detail.createDateText }</p>
        </div>
        <div className="input_item">
          <label>回复人ID:</label>
          <p>{ detail.replyId }</p>
        </div>
        <div className="input_item">
          <label>回复人:</label>
          <p>{ detail.replyXingMing }</p>
        </div>
        <div className="input_item">
          <label>内容:</label>
          <p>{ detail.content }</p>
        </div>
      </div>
    )
  }
}
class ReplyList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {title: '点评ID', dataIndex: 'reviewId', key: 'reviewId'},
      {title: '创建日期', dataIndex: 'createDateText', key: 'createDate'},
      {title: '回复人ID', dataIndex: 'replyId', key: 'replyId'},
      {title: '回复人', dataIndex: 'replyXingMing', key: 'replyXingMing'},
      {title: '内容', dataIndex: 'content', key: 'content', width:'25%'},
      {
        title: '操作',
        key: 'operation',
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
      },
      newKey: 1,
      detailState: ''
    };

    //table配置
    this.option = {
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
        }
      }
    }
  }

  //数据转换
  convert() {
    const result = this.props.result.resultList;
    const res = result.map((item, index)=> {
      return {
        key: index,
        createDateText: CommonFun.dateFormat('yyyy年MM月dd日', item.createDate),
        ...item
      }
    });
    return res;
  }

  //详情弹层
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
      },
    }
  };


  render() {
    const { currentPage } = this.state;
    const columns = this.columns;
    const result = this.convert();
    const paginationOption = {
      total: this.props.result.total,
      onChange: (page) => {
        this.props.changePage(page);
        this.setState({
          currentPage:page
        })
      }
    };
    let ModalComponent;
    if (this.state.detailState == 'look') {
      ModalComponent = <ModalLook detail={ this.state.dataDetail }/>
    }
    return (
      <div>
        <Form>
          <Modal
            className={ 'lookModal'}
            key={ this.state.newKey }
            title={(this.state.detailState == 'look')?'查看':"窗口"}
            visible={ this.state.visible }
            onOk={ this.modelTool().handleOk }
            onCancel={ this.modelTool().handleCancel }
          >
            { ModalComponent }
          </Modal>
        </Form>
        <p style={{ marginBottom:'10px',fontSize:'12px' }}>共计{ this.props.result.total }条，每页显示{ 10 }条，当前显示为第{ currentPage }页</p>
        <Table pagination={ paginationOption } loading={ this.props.status } { ...this.option } columns={ columns }
               dataSource={ result }
               rowKey={ record  => record.key }/>
      </div>
    );
  }
}


export default Form.create()(ReplyList);

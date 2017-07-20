/**
 * Created by XiaoYu on 2017/6/19.
 * 点评列表
 */
import React, { Component } from 'react';
import { Table, Button, Modal, Input, Form, Popconfirm, Select } from 'antd';
import { Map, List } from 'immutable';
import SuggestionModel from '../../../models/suggestionData';
import CommonFun from '../../../components/util/utils';//公共方法
const FormItem = Form.Item;
const SuggestionData = new SuggestionModel();
const Option = Select.Option;
class ModalEdit extends Component {
  render() {
    const detail = this.props.detail;
    const { getFieldDecorator } = this.props.getFieldDecorator;
    return (
      <div>
        <FormItem
          label="用户ID:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('userId', {
            initialValue: detail.userId,
            rules: [{
              required: true,
              message: '请输入用户ID',
            }]
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="用户昵称:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('nickName', {
            initialValue: detail.nickName,
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="反馈内容:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('content', {
            initialValue: detail.content,
            rules: [{
              required: true,
              message: '请输入反馈内容',
            }],
          })(
            <Input type="textarea" />
          )}
        </FormItem>
        <FormItem
          label="联系方式:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('mobile', {
            initialValue: detail.mobile
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="回复内容:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('replyContent', {
            initialValue: detail.replyContent,
            rules:[{
              required:true,
              min:10,
              max:300,
              message: '请回复10-300个字符.',
            }]
          })(
            <Input type="textarea"/>
          )}
        </FormItem>
        <FormItem
          label="状态:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('status', {
            initialValue: detail.statusText
          })(
            <Select allowClear="true" className="search_item" placeholder="状态">
              <Option key="1">已处理</Option>
              <Option key="0">未处理</Option>
            </Select>
          )}
        </FormItem>
      </div>
    )
  }
}

class ModalLook extends Component {
  render() {
    const detail = this.props.detail;
    return (
      <div>
        <div className="input_item">
          <label>用户ID:</label>
          <p>{ detail.userId }</p>
        </div>
        <div className="input_item">
          <label>用户昵称:</label>
          <p>{ detail.nickName }</p>
        </div>
        <div className="input_item">
          <label>反馈内容:</label>
          <p>{ detail.content }</p>
        </div>
        <div className="input_item">
          <label>反馈类型:</label>
          <p>{ detail.type }</p>
        </div>
        <div className="input_item">
          <label>反馈时间:</label>
          <p>{ detail.createDateText }</p>
        </div>
        <div className="input_item">
          <label>联系方式:</label>
          <p>{ detail.mobile }</p>
        </div>
        <div className="input_item">
          <label>回复内容:</label>
          <p>{ detail.replyContent }</p>
        </div>
        <div className="input_item">
          <label>状态:</label>
          <p>{ detail.statusText }</p>
        </div>
        <div className="input_item">
          <label>回复时间:</label>
          <p>{ detail.replyDateText }</p>
        </div>
      </div>
    )
  }
}
class SuggestionList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {title: '用户ID', dataIndex: 'userId', key: 'userId'},
      {title: '用户昵称', dataIndex: 'nickName', key: 'nickName'},
      {title: '反馈内容',className:'column_inline', dataIndex: 'content', key: 'content'},
      {title: '反馈类型', dataIndex: 'type', key: 'type'},
      {title: '反馈时间', dataIndex: 'createDateText', key: 'createDateText'},
      {title: '联系方式', dataIndex: 'mobile', key: 'mobile'},
      {title: '回复内容', className:'column_inline',dataIndex: 'replyContent', key: 'replyContent'},
      {title: '回复时间', dataIndex: 'replyDateText', key: 'replyDateText'},
      {title: '状态', dataIndex: 'statusText', key: 'status'},

      {
        title: '操作',
        key: 'operation',
        render: (text, record, index) => {
          return (
            <div>
              <a className="operationBtn" onClick={ this.modelTool().showModal.bind(this , text, 'look') }
                 href="javascript:;">查看</a>
              <a className="operationBtn" onClick={ this.modelTool().showModal.bind(this , text, 'edit') }
                 href="javascript:;">修改</a>
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
        createDateText: CommonFun.dateFormat('yyyy-MM-dd HH:mm:ss', item.createDate),
        replyDateText: CommonFun.dateFormat('yyyy-MM-dd HH:mm:ss', item.replyDate),
        statusText:item.status==0?"未处理":"已处理",
        ...item
      }
    });
    return res;
  }

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
      //修改弹层提交
      handleOk: () => {
        this.props.form.validateFields((err, fieldsValue) => {
          const sendData = {
            ...fieldsValue,
            id: this.state.dataDetail.id
          };
          if (!err) {
            SuggestionData.editSuggestion(sendData).then(data => {
              if (data.ok) {
                this.setState({
                  visible: false
                });
                this.props.refreshList();
              }
            });
          }
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
    const { currentPage } = this.state;
    const columns = this.columns;
    const result = this.convert();
    const getFieldDecorator = this.props.form;
    const paginationOption = {
      current:this.props.condition.currentPage,
      total: this.props.result.total,
      onChange: (page) => {
        this.props.changePage(page);
        this.setState({
          currentPage: page
        })
      }
    };

    let ModalComponent;
    if (this.state.detailState == 'look') {
      ModalComponent = <ModalLook detail={ this.state.dataDetail }/>
    } else if (this.state.detailState == 'edit') {
      ModalComponent = <ModalEdit detail={ this.state.dataDetail } getFieldDecorator={ getFieldDecorator }/>
    }

    return (
      <div>
        <Form>
          <Modal
            className={ (this.state.detailState == 'look') ? 'lookModal' : '' }
            key={ this.state.newKey }
            title={ (this.state.detailState == 'add') ? '添加' :(this.state.detailState == 'look')?'查看':'编辑' }
            visible={ this.state.visible }
            onOk={ (this.state.detailState == 'add') ? this.modelTool().addHandleOk : this.modelTool().handleOk }
            onCancel={ this.modelTool().handleCancel }
          >
            { ModalComponent }
          </Modal>
        </Form>
        <p style={{ marginBottom:'10px',fontSize:'12px' }}>
          共计{ this.props.result.total }条，每页显示{ 10 }条，当前显示为第{ currentPage }页</p>
        <div  className='table_inline'>
          <Table pagination={ paginationOption } loading={ this.props.status } { ...this.option } columns={ columns }
                 dataSource={ result }
                 rowKey={ record  => record.key }
          />
        </div>

      </div>
    );
  }
}


export default Form.create()(SuggestionList);

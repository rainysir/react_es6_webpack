/**
 * Created by XiaoYu on 2017/6/19.
 * 点评列表
 */
import React, { Component } from 'react';
import { Table, Button, Modal, Input, Form, Popconfirm, Select } from 'antd';
import { Map, List } from 'immutable';
import SharedModel from '../../../models/sharedData';
import CommonFun from '../../../components/util/utils';//公共方法
const FormItem = Form.Item;
const SharedData = new SharedModel();
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
          label="用户对象:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('userObject', {
            initialValue: detail.userObject,
            rules: [{
              required: true,
              message: '请输入用户对象',
            }]
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="分享链接:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('sharedUrl', {
            initialValue: detail.sharedUrl,
            rules: [{
              required: true,
              message: '请输入分享链接',
            }],
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="创建时间:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('createDate', {
            initialValue: detail.createDate
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="对象ID:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('objectId', {
            initialValue: detail.objectId
          })(
            <Input/>
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
          <label>分享链接:</label>
          <p>{ detail.sharedUrl }</p>
        </div>
        <div className="input_item">
          <label>创建时间:</label>
          <p>{ detail.createDateText }</p>
        </div>
        <div className="input_item">
          <label>对象ID:</label>
          <p>{ detail.objectId }</p>
        </div>
      </div>
    )
  }
}
class SharedList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {title: '用户ID', dataIndex: 'userId', key: 'userId'},
      {title: '分享链接', dataIndex: 'sharedUrl', key: 'sharedUrl'},
      {title: '创建时间', dataIndex: 'createDateText', key: 'createDate'},
      {title: '对象ID', dataIndex: 'objectId', key: 'objectId'},
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
        createDateText: CommonFun.dateFormat('yyyy-MM-dd HH:mm:ss', item.createDate),
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
            SharedData.editShared(sendData).then(data => {
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
        <Table pagination={ paginationOption } loading={ this.props.status } { ...this.option } columns={ columns }
               dataSource={ result }
               rowKey={ record  => record.key }/>
      </div>
    );
  }
}


export default Form.create()(SharedList);

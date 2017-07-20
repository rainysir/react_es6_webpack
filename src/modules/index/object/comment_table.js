/**
 * Created by XiaoYu on 2017/6/19.
 * 点评列表
 */
import React, { Component } from 'react';
import { Table, Button, Modal, Input, Form, Popconfirm, Select } from 'antd';
import { Map, List } from 'immutable';
import CommentModel from '../../../models/ObjectData';
import CommonFun from '../../../components/util/utils';//公共方法
const FormItem = Form.Item;
const CommentData = new CommentModel();
const Option = Select.Option;
class ModalAdd extends Component {

  render() {
    const { getFieldDecorator } = this.props.getFieldDecorator;
    return (
      <div>
        <FormItem
          label="名称:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '请输入名称',
            }],
          })(
            <Input className="search_item"/>
          )}
        </FormItem>
        <FormItem
          label="代码:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('code', {
            rules: [{
              required: true,
              message: '请输入代码',
            }],
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="所属分类:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('byType', {
            rules: [{
              required: true,
              message: '请输入所属分类',
            }],
          })(
            <Select style={{ width:'100%' }} className="search_item" placeholder="分类名称">
              <Option key="alibi_jz_manager">家装</Option>
              <Option key="alibi_fc_manager">房产</Option>
              <Option key="alibi_sp_manager">商品</Option>
              <Option key="alibi_sales_manager">导购员</Option>
              <Option key="alibi_cms_manager">cms</Option>
              <Option key="alibi_lg_manager">龙果</Option>
              <Option key="alibi_zb_manager">直播</Option>
              <Option key="alibi_msite_manager">M站</Option>
              <Option key="alibi_app_manager">主app</Option>
              <Option key="alibi_share_manager">分享</Option>
              <Option key="alibi_parise_manager">点赞</Option>
              <Option key="alibi_pictureshow_manager">图片展现</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="描述:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('description')(
            <Input/>
          )}
        </FormItem>
      </div>
    )
  }
}
class ModalEdit extends Component {
  render() {
    const detail = this.props.detail;
    const { getFieldDecorator } = this.props.getFieldDecorator;
    return (
      <div>
        <FormItem
          label="名称:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('name', {
            initialValue: detail.name,
            rules: [{
              required: true,
              message: '请输入名称',
            }]
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="编码:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('code', {
            initialValue: detail.code,
            rules: [{
              required: true,
              message: '请输入编码',
            }]
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="所属分类:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('byType', {
            initialValue: detail.byType,
            rules: [{
              required: true,
              message: '请输入所属分类',
            }],
          })(
            <Select style={{ width:'100%' }} className="search_item" placeholder="分类名称">
              <Option key="alibi_jz_manager">家装</Option>
              <Option key="alibi_fc_manager">房产</Option>
              <Option key="alibi_sp_manager">商品</Option>
              <Option key="alibi_sales_manager">导购员</Option>
              <Option key="alibi_cms_manager">cms</Option>
              <Option key="alibi_lg_manager">龙果</Option>
              <Option key="alibi_zb_manager">直播</Option>
              <Option key="alibi_msite_manager">M站</Option>
              <Option key="alibi_app_manager">主app</Option>
              <Option key="alibi_share_manager">分享</Option>
              <Option key="alibi_parise_manager">点赞</Option>
              <Option key="alibi_pictureshow_manager">图片展现</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="描述:"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17,offset:1 }}
        >
          {getFieldDecorator('description', {
            initialValue: detail.description
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
          <label>名称:</label>
          <p>{ detail.name }</p>
        </div>
        <div className="input_item">
          <label>编码:</label>
          <p>{ detail.code }</p>
        </div>
        <div className="input_item">
          <label>所属分类:</label>
          <p>{ detail.byType }</p>
        </div>
        <div className="input_item">
          <label>描述:</label>
          <p>{ detail.description }</p>
        </div>
        <div className="input_item">
          <label>创建时间:</label>
          <p>{ detail.createDateText }</p>
        </div>
      </div>
    )
  }
}
class CommentList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {title: '名称', dataIndex: 'name', key: 'name'},
      {title: '代码', dataIndex: 'code', key: 'code'},
      {title: '描述', dataIndex: 'description', key: 'description'},
      {title: '所属分类', dataIndex: 'byType', key: 'byType'},
      {title: '创建时间', dataIndex: 'createDateText', key: 'createDate'},
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
              <Popconfirm title="是否删除？" onConfirm={ this.modelTool().deleteItem.bind(this, text, 'delete') } okText="确定"
                          cancelText="取消">
                <a href="javascript:;">删除</a>
              </Popconfirm>
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
      //删除
      deleteItem: (data, type) => {
        console.log(data);
        const sendData = {
          isDel:1,
          id: data.id
        };
        CommentData.editComment(sendData).then(data => {
          if (data.ok) {
            this.props.refreshList();
          }
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
            CommentData.editComment(sendData).then(data => {
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
      },
      //新增弹层提交
      addHandleOk: () => {
        this.props.form.validateFields((err, fieldsValue) => {
          if (!err) {
            CommentData.addComment(fieldsValue).then(data => {
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
      //添加
      handleAdd: () => {
        this.setState({
          visible: true,
          detailState: 'add',
          newKey: ++this.state.newKey
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
    if (this.state.detailState == 'add') {
      ModalComponent = <ModalAdd ref='addModal' getFieldDecorator={ getFieldDecorator }/>
    } else if (this.state.detailState == 'look') {
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
        <Button style={{ margin:'20px 0 5px 0' }} type="primary" onClick={ this.modelTool().handleAdd }>添加</Button>
        <p style={{ marginBottom:'10px',fontSize:'12px' }}>
          共计{ this.props.result.total }条，每页显示{ 10 }条，当前显示为第{ currentPage }页</p>
        <Table pagination={ paginationOption } loading={ this.props.status } { ...this.option } columns={ columns }
               dataSource={ result }
               rowKey={ record  => record.key }/>
      </div>
    );
  }
}


export default Form.create()(CommentList);

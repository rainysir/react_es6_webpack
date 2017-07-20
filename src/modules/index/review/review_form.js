/**
 * Created by XiaoYu on 2017/6/19.
 * 点评表单
 */
import React, {Component} from 'react';
import { Form, DatePicker, Input, TimePicker, Button, Select } from 'antd';
import CommentModel from '../../../models/reviewData'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const reviewData = new CommentModel();
const Option = Select.Option;
export default class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameListChildren:[]
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const rangeValue = fieldsValue['range-picker'];
      let values = {
        ...fieldsValue
      };
      if(rangeValue&&rangeValue.length>0){
        values = {
          ...fieldsValue,
          'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
        };
      }
      this.props.search(values);
    });
  };

  componentDidMount = () => {
    this.getNameList();
  };

  getNameList = () => {
    reviewData.nameList({}).then(data => {
      if(data.ok){
        const list = data.dataMap.options;
        const nameListChildren = list.map(item => <Option key={ item.code }>{ item.name }</Option>);
        this.setState({
          nameListChildren:nameListChildren
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', message: 'Please select time!' }],
    };
    const inputItemLayout = {
      wrapperCol:{
        xs: { span: 24, offset: 0 },
        sm: { span: 3, offset: 0 }
      }
    };
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <FormItem
          { ...inputItemLayout }
        >
          {getFieldDecorator('objectId')(
            <Input className="search_item" placeholder="对象ID" />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 3 }
          }}
        >
          {getFieldDecorator('objectName')(
            <Select allowClear="true" className="search_item" placeholder="对象名称">
              { this.state.nameListChildren }
            </Select>
          )}
        </FormItem>
        <FormItem
          { ...inputItemLayout }
        >
          {getFieldDecorator('userId')(
            <Input className="search_item" placeholder="用户openID" />
          )}
        </FormItem>
        <FormItem style={{ marginBottom:'0' }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 24, offset: 0 }
          }}
        >
          {getFieldDecorator('range-picker', rangeConfig)(
            <RangePicker />
          )}

          <Button style={{marginLeft:'20px'}} type="primary" htmlType="submit" size="large">搜索</Button>
        </FormItem>
      </Form>
    );
  }
}



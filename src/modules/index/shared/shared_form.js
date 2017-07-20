/**
 * Created by XiaoYu on 2017/6/19.
 * 点评表单
 */
import React, {Component} from 'react';
import { Form, DatePicker, Input, TimePicker, Button } from 'antd';
import SharedModel from '../../../models/sharedData'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
export default class TimeRelatedForm extends Component {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', message: 'Please select time!' }],
    };
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
          <FormItem
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 3, offset: 0 }
            }}
          >
            {getFieldDecorator('userId')(
              <Input className="search_item" placeholder="用户ID" />
            )}
          </FormItem>
        <FormItem
            wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 3, offset: 0 }
          }}
          >
            {getFieldDecorator('objectId')(
              <Input className="search_item" placeholder="对象ID" />
            )}
          </FormItem>
        <FormItem style={{ marginBottom:'0' }}
          labelCol={{
            xs: { span: 0 },
            sm: { span: 0 },
          }}
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



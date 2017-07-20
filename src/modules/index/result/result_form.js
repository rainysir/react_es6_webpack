/**
 * Created by XiaoYu on 2017/6/19.
 */
import React, {Component} from 'react';
import { Form, DatePicker, Input, TimePicker, Button } from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

export default class ResultForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // const rangeValue = fieldsValue['range-picker'];
      let values = {
        ...fieldsValue
      };
      // if(rangeValue){
      //   values = {
      //     ...fieldsValue
      //   //  'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
      //   };
      // }
      this.props.search(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <FormItem
          wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 3, offset: 0 }
            }}
        >
          {getFieldDecorator('name')(
            <Input className="search_item" placeholder="名称"/>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 3, offset: 0 }
            }}
        >
          {getFieldDecorator('code')(
            <Input className="search_item" placeholder="编码"/>
          )}
        </FormItem>

        <FormItem
          wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 3, offset: 0 }
            }}
        >
          {getFieldDecorator('minScore')(
            <Input className="search_item" placeholder="最小分数"/>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 3, offset: 0 }
          }}
        >
          {getFieldDecorator('maxScore')(
            <Input className="search_item" placeholder="最大分数"/>
          )}
        </FormItem>

        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 3, offset: 0 }
          }}>
          <Button style={{marginLeft:'20px'}} type="primary" htmlType="submit" size="large">搜索</Button>
        </FormItem>
      </Form>
    );
  }
}



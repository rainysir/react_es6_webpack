/**
 * Created by XiaoYu on 2017/6/19.
 */
import React, {Component} from 'react';
import { Form, DatePicker, Input, TimePicker, Button } from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

export default class ReplyForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log(fieldsValue);
      let values = {
        ...fieldsValue
      };
      this.props.search(values);
      const rangeValue = fieldsValue['range-picker'];

      if(rangeValue&&rangeValue.length>0){
        values = {
          ...fieldsValue,
          'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
        };
      }
      console.log('Received values of form: ', values);
    });
  }
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
          {getFieldDecorator('reviewId')(
            <Input className="search_item" placeholder="点评ID" />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 3, offset: 0 }
          }}
        >
          {getFieldDecorator('replyId')(
            <Input className="search_item" placeholder="回复人ID" />
          )}
        </FormItem>

        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 3, offset: 0 }
          }}
        >
          {getFieldDecorator('replyXingMing')(
            <Input className="search_item" placeholder="回复人" />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 3, offset: 0 }
          }}
        >
          {getFieldDecorator('content')(
            <Input className="search_item" placeholder="内容" />
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



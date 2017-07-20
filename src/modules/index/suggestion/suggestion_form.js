/**
 * Created by XiaoYu on 2017/6/19.
 * 点评表单
 */
import React, {Component} from 'react';
import { Form, DatePicker, Input, TimePicker, Button ,Select} from 'antd';
import SuggestionModel from '../../../models/suggestionData'
const suggestionData = new SuggestionModel();
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
export default class TimeRelatedForm extends Component {
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
      const rangeValue2 = fieldsValue['range-picker2'];
      let values = {
        ...fieldsValue
      };
      if(rangeValue&&rangeValue.length>0){
        values = {
          ...fieldsValue,
          'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
        };
      }
      if(rangeValue2&&rangeValue2.length>0){
        values = {
          ...fieldsValue,
          'range-picker2': [rangeValue2[0].format('YYYY-MM-DD'), rangeValue2[1].format('YYYY-MM-DD')]
        };
      }
      this.props.search(values);
    });
  };
  componentDidMount = () => {
    this.getNameList();
  };

  getNameList = () => {
    suggestionData.nameList({}).then(data => {
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
            {getFieldDecorator('mobile')(
              <Input className="search_item" placeholder="联系方式" />
            )}
          </FormItem>
        <FormItem
            wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 3, offset: 0 }
          }}
          >
            {getFieldDecorator('status')(
              <Select allowClear="true" className="search_item" placeholder="状态">
                <Option key="1">已处理</Option>
                <Option key="0">未处理</Option>
              </Select>
              // <Input className="search_item" placeholder="状态" />
            )}
          </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 3 }
          }}
        >
          {getFieldDecorator('questionType')(
            <Select allowClear="true" className="search_item" placeholder="反馈类型">
              { this.state.nameListChildren }
            </Select>
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
            <RangePicker placeholder={['反馈开始时间', '反馈结束时间']}/>
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
          {getFieldDecorator('range-picker2', rangeConfig)(
            <RangePicker placeholder={['回复开始时间', '回复结束时间']}/>
          )}

          <Button style={{marginLeft:'20px'}} type="primary" htmlType="submit" size="large">搜索</Button>
        </FormItem>
      </Form>
    );
  }
}



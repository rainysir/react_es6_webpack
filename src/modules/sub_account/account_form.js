/**
 * 子账户form组件
 */
import { Form, Input, Select, Button, Modal } from 'antd';
import { EditableTable } from './account_table';
import './style.scss';
import AccountModel from '../../models/accountData';
import CommonFun from '../../components/util/utils';//公共方法
import createBrowserHistory from 'history/createBrowserHistory';

//弹层组件
class App extends React.Component {
  constructor(props) {
    super(props);
    this.accountModel = new AccountModel();
  }

  state = {
    ModalText: '岗位名称',
    visible: false,
    departmentName: ""
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  }
  handleOk = () => {
    const t = this;
    let departmentName = this.state.departmentName;
    t.setState({
      confirmLoading: true,
    });
    console.log(departmentName.length <= 10)
    if(departmentName.length > 10){
      t.setState({
        confirmLoading: false
      });
      CommonFun.showNotificationBox('warning', '输入名称超出长度限制');
      return;
    }
    //岗位名称唯一性效验
    this.accountModel.checkRoleName("departmentName=" + departmentName).then(data => {
      if (data.code == 200) {
        t.accountModel.newDeparment("departmentName=" + departmentName).then(data => {
          if (data.code == 200) {
            let currentId = data.dataMap;
            t.setState({
              visible: false,
              confirmLoading: false
            });
            t.props.history.push("/Permission/" + currentId + "/" + departmentName);
          } else {
            t.setState({
              confirmLoading: false,
            });
          }
        })
      } else {
        t.setState({
          confirmLoading: false,
        });
      }
    })

  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  setDepartmentName = (e) => {
    this.setState({
      departmentName: e.target.value
    })
  }

  render() {
    const departmentName = this.state.departmentName;
    return (
      <div>
        <Modal title="新建岗位"
               visible={this.state.visible}
               onOk={this.handleOk}
               confirmLoading={this.state.confirmLoading}
               onCancel={this.handleCancel}
        >
          <p style={{display:"inline"}}>{this.state.ModalText}</p>
          <Input style={{ width:150,marginLeft:20}} value={ departmentName } onChange={ this.setDepartmentName }
                 placeholder="自填(10个字内中英字)"/>
        </Modal>
      </div>
    );
  }
}
//表单组件
export default class AccountForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jsonData: "",
      searchName: "",
      IspermissionId: "",
      total: 0,
      current:1
    };
    this.accountModel = new AccountModel();
  }

  //搜索像父组件传值
  searchJob = (page = 1) => {
    if(typeof page != "number"){
      page = 1;
    }
    this.setState({
      current:page
    })

    const t = this;
    t.accountModel.accountList({
      name: t.state.searchName,
      IspermissionId: t.state.IspermissionId,
      pageNo: page
    }).then(data => {
      if (data.code == 200) {
        let dataMap = data.dataMap,
          dataList = dataMap.lists;
        dataList.forEach((ele, index) => {
          ele.key = index;
          ele.createdTime = CommonFun.dateFormat("yyyy年MM月dd日 HH:mm:ss");
          ele.modifierTime = CommonFun.dateFormat("yyyy年MM月dd日 HH:mm:ss");
          if (ele.permissionId == 0) {
            ele.permissionId = "未授权";
          } else {
            ele.permissionId = "已授权";
          }
        })
        t.setState({
          jsonData: dataList,
          total: dataMap.page.total
        })
        t.refs.accountList.changeDataSource();
      }
    });
  }

  handleChange = value => {
    this.setState({
      IspermissionId: value
    })
  }

  setSearchName = (e) => {
    this.setState({searchName: e.target.value});
  }

  showModel = () => {
    this.refs.modalTemp.showModal();
  }

  componentWillMount = () => {
    this.searchJob();
  }

  render() {
    const Option = Select.Option;
    let searchName = this.state.searchName;
    return (
      <div className="accountWrap">
        <App history={this.props.history} ref="modalTemp"/>
        <div className="formWrap">
          <h3 className="title">岗位列表</h3>
          <div className="inputWrap">
            <label>岗位名称<Input value={searchName} className="name_post" onChange={this.setSearchName}
                              placeholder="岗位名称"/></label>
            <label>授权状态
              <Select defaultValue="" style={{ width: 120,marginLeft:15 }} onChange={this.handleChange}>
                <Option value="">全部</Option>
                <Option value="1">已授权</Option>
                <Option value="0">未授权</Option>
              </Select>
            </label>
            <Button style={{ marginLeft:15 }} icon="search" onClick={this.searchJob}>查询</Button>
          </div>
        </div>
        <EditableTable ref="accountList" current={this.state.current} total={this.state.total} searchFun={this.searchJob} showModel={this.showModel}
                       jsonData={this.state.jsonData}/>
      </div>

    )
  }
}

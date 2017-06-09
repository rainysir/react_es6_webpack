/**
 * 子账户列表页table组件
 */
import { Table } from 'antd';
import { Modal, Input, Icon, Button, Popconfirm, Pagination } from 'antd';
import AccountModel from '../../models/accountData';
import CommonFun from '../../components/util/utils';//公共方法
const confirm = Modal.confirm;
class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.accountModel = new AccountModel();
    this.state = {
      initValue: "",
      value: this.props.value,
      editable: false,
      thisId:this.props.dataJson.id
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({value});
  }
  check = () => {
    let tag = false;
    this.setState({editable: false});
    //岗位名称唯一性效验
    this.accountModel.checkRoleName("departmentName=" + this.state.value + "&departmentId=" + this.state.thisId).then(data => {
      if (data.code == 200 && data.dataMap == true) {
        tag = true;
      } else {
        CommonFun.showNotificationBox('warning', '用户名重复！');
        this.setState({value: this.state.initValue});
      }
      if (this.props.onChange) {
        this.props.onChange(this.state.value, tag);
      }
    })
  }
  edit = () => {
    this.setState({
      initValue: this.state.value,
      editable: true
    });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

export class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '序号',
      dataIndex: 'key'
    }, {
      title: '岗位名称',
      dataIndex: 'name',
      key:'name',
      render: (text, record, index) => (
        <EditableCell
          key={record.id}
          value={text}
          dataJson={record}
          onChange={this.onCellChange(index, 'name')}
        />
      ),
    }, {
      title: '授权状态',
      dataIndex: 'permissionId',
    }, {
      title: '创建时间',
      dataIndex: 'createdTime'
    }, {
      title: '更新时间',
      dataIndex: 'modifierTime'
    }, {
      title: '更新人员',
      dataIndex: 'modifierName'
    }, {
      title: '岗位权限',
      render: (text, record, index) => {
        let permissionStatus = "授权",
          name = record.name,
          id = record.id,
          url = "#/Permission/" + id + "/" + name;
        if (record.permissionId == "已授权") {
          permissionStatus = "修改授权";
        }
        return (
          <a href={ url }>{ permissionStatus }</a>
        );
      }
    }, {
      title: '操作',
      render: (text, record, index) => {
        return (
          //<Popconfirm title="确认删除?" onConfirm={() => this.onDelete(index)}>
          //  <a href="#">删除</a>
          //</Popconfirm>
          <a href="javascript:;" onClick={() => this.showConfirm(index)}>删除</a>
        );
      },
    }];
    this.accountModel = new AccountModel();

    this.state = {
      dataSource: "",
      count: 2,
      current:1
    };
  }

  onCellChange = (index, key) => {
    const t = this;
    return (value, tag) => {
      const dataSource = [...this.state.dataSource], currentId = dataSource[index].id;
      if (tag) {
        //岗位名称编辑
        t.accountModel.editDeparment("departmentId=" + currentId + "&departmentName=" + value).then(data => {})
      }
    };
  }
  showConfirm = (index) => {
    const t = this;
    const dataSource = [...t.state.dataSource];
    confirm({
      title: '你确定删除"' + dataSource[index].name + '"这个岗位吗？删除后将无法恢复！',
      onOk() {

        //岗位删除
        t.accountModel.deleteDeparment("roleId=" + dataSource[index].id).then(data => {
          if (data.code == 200 && data.dataMap == true) {
            dataSource.splice(index, 1);
            t.setState({dataSource});
          }
        });
      },
      onCancel() {},
    });
  }

  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    //岗位删除
    this.accountModel.deleteDeparment("roleId=" + dataSource[index].id).then(data => {
      if (data.code == 200 && data.dataMap == true) {
        dataSource.splice(index, 1);
        this.setState({dataSource});
      }
    });
  }
  handleAdd = () => {
    this.props.showModel();
  }

  changeDataSource = () => {
    this.setState({
      dataSource: this.props.jsonData
    })
  }

  changePagination = (page, pageSize) => {
    this.props.searchFun(page);
  }

  render() {
    const dataSource = this.state.dataSource;
    const columns = this.columns;
    const t = this;
    let option = {
      current:this.props.current,
      defaultCurrent: 1,
      total: t.props.total,
      onChange: function (page, pageSize) {
        t.props.searchFun(page);
      }
    }
    return (
      <div className="accountListWrap">
        <Button type="primary" className="editable-add-btn" onClick={this.handleAdd}>新建岗位</Button>
        <Table pagination={option} bordered dataSource={ dataSource } columns={columns}/>
      </div>
    );
  }
}



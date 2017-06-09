/**
 * 子账户菜单Tree
 */
import './style.scss';
import {Modal,Button, Row,message, Input,Tree} from 'antd';
import AccountModel from '../../models/accountData';
const TreeNode = Tree.TreeNode;

export default class PremissionTree extends React.Component {

  constructor(props) {
    super(props);
    let t = this;
    t.state = {
      loading: true,
      data: null,
      change: [],
      changeData: null,
      visible: false,
    };
    t.roleModel = new AccountModel();//树model
  }

  contextTypes = {router: ()=> React.PropTypes.func.isRequired};

  componentWillMount() {
    let t = this;
    const params = this.props.match.params;

    //渲染左侧权限
    t.roleModel.getPermission({departmentId: params.id}).then((data)=> {
      if (data.code == 200) {
        let removeDisabled=document.getElementById('moveRight');
        removeDisabled.setAttribute('disabled','true');
        console.log(t.state.change);
        var defaultArr = [],
          dataList = data.dataMap;
        console.log(dataList);
        dataList.forEach((item) => {
          //defaultArr.push(JSON.stringify(item.key));
          if (item.children) {
            for (var i = 0; i < item.children.length; i++) {
              defaultArr.push(JSON.stringify(item.children[i].key));
            }
          }
        });
        console.log(defaultArr);
      }

      t.setState({
        changeData: dataList,
        //change:["11275","11283","11276","11232"]
        change: defaultArr
      });
      t.roleModel.allPermissionUnderRole({departmentId: params.id}).then((data)=> {
        if(data.code == 200){
          t.setState({
            data: data.dataMap
          })

        }
      })
    })
  };

  onSelect() {

  };

  onCheck = (checkedKeys, info) => {
    let removeDisabled=document.getElementById('moveRight');
    let t = this;

    removeDisabled.removeAttribute('disabled');
    checkedKeys.concat(info.halfCheckedKeys);
    console.log(checkedKeys.concat(info.halfCheckedKeys));
    t.setState({
      change:checkedKeys.concat(info.halfCheckedKeys),
    })
  };
//授权角色权限
  movePremission = ()=> {
    let t = this;
    let changeData = t.state.change;
    const params = this.props.match.params;
    t.roleModel.departmentPermission("departmentId=" + params.id, changeData).then(data => {
      if (data.code == 200 && data.dataMap == true) {
        t.roleModel.getPermission({departmentId: params.id}).then(data =>{
          console.log(data.dataMap);
          t.setState({
            changeData:data.dataMap
          })
        });
      }
    })


  };
  //授权成功提示
  showModal = () => {
    let t = this;
    let change=t.state.change;
    let changeData=t.state.changeData;
    console.log(changeData);
    if(change==''||changeData==''){
      message.success('请先分配完权限', 1.5);
      return;
    }
    t.setState({
      visible: true,
    });
    setTimeout(()=> {
      t.props.history.push("/accountList");
    }, 2000)
  }

  backList = () => {
    this.props.history.push("/accountList");
  }


  render() {
    let t = this;
    const loop = data => data.map((item) => {

      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.title} key={item.key} isLeaf={item.isLeaf}/>;
    });

    const loopRight = changeData => changeData.map((item) => {
      if (item.children) {
        return <TreeNode disableCheckbox defaultExpandAll title={item.title} key={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode disableCheckbox defaultExpandAll title={item.title} key={item.key} isLeaf={item.isLeaf}/>;
    });


    return (
      <div className="permission-content">
        <div className="permission-head">
            <span><b>岗位：{this.props.match.params.name}</b></span>
        </div>
        <div style={{width:700,margin:'0 auto',display:'flex'}}>
          <div className="permission-left">
            <div className="permission-title">菜单权限</div>
            <div style={{paddingLeft:40,fontSize: 14}}>
              {!!t.state.data && t.state.data.length > 0 ? (
                <Tree defaultCheckedKeys={this.state.change} checkable defaultExpandAll onSelect={t.onSelect.bind(t)}
                      onCheck={this.onCheck}>
                  {!!t.state.data ? loop(t.state.data) : null}
                </Tree>
              ) : null}
            </div>
          </div>

          <Button type="primary" id="moveRight" className="moveRight" onClick={this.movePremission}>分配并保存</Button>

          <div className="permission-right">
            <div className="permission-title">已有权限</div>
            <div style={{paddingLeft:40}}>
              {!!t.state.changeData && t.state.changeData.length > 0 ? (
                <Tree defaultExpandAll>
                  {!!t.state.changeData ? loopRight(t.state.changeData) : null}
                </Tree>
              ) : null}
            </div>
          </div>
        </div>
        <div className="permission-btn">
          <Button onClick={this.backList}>返回</Button>
          <Button type="primary" onClick={this.showModal}>确认</Button>
          <Modal visible={this.state.visible} footer={null} closable={false} className="sModal">
            <p>权限分配成功！</p>
            <p><span style={{color:'#2088d8'}}>2s</span>自动跳转至列表页</p>
          </Modal>
        </div>
      </div>
    );
  }
}


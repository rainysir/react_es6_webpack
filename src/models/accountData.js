/**
 * Created by XiaoYu on 2017/4/21.
 * 子账户页面数据交互
 */
import CommonModel from './CommonModel';
export default class AccountModel {

  _convert(data) {
    if (data) {
      data._convert = true;
      return data;
    }
  }
  //  获取子账户岗位列表
  accountList(parms) {
    let postList = CommonModel.get('/api-upms/deparment', parms).then(data => {
      return data;
    });
    return postList;
  }
  //岗位唯一性检测
  checkRoleName(parms) {
    let verification = CommonModel.post('/api-upms/deparment/check_role_name?'+ parms).then(data => {
      return data;
    });
    return verification;
  }
  //岗位编辑
  editDeparment(parms) {
    let editResult = CommonModel.post('/api-upms/deparment/edit_deparment?'+ parms).then(data => {
      return data;
    });
    return editResult;
  }
  //创建岗位
  newDeparment(parms) {
    let createResult = CommonModel.post('/api-upms/deparment/new_deparment?'+ parms).then(data => {
      return data;
    });
    return createResult;
  }
  //删除岗位
  deleteDeparment(parms) {
    let deleteResult = CommonModel.post('/api-upms/deparment/remove?'+ parms).then(data => {
      return data;
    });
    return deleteResult;
  }

  //获取所有权限接口
  allPermissionUnderRole(params) {
    let sampleData = CommonModel.get('/api-upms/deparment/allPermissionUnderRole', params).then((data)=> {
      console.log(1111, data)
      return this._convert(data);
    });
    return sampleData;
  };

  //获取已经取得的权限接口
  getPermission(params) {
    let getPermissionData = CommonModel.get('/api-upms/deparment/departmentPermission', params).then((data)=> {
      return data;
    });
    return getPermissionData;
  };

  //岗位授权接口
  departmentPermission(params1,params2) {
    let departmentPermission = CommonModel.post('/api-upms/deparment/departmentPermission?' + params1, params2).then((data)=> {
      return data;
    });
    return departmentPermission;
  };

}


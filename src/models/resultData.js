/**
 * Created by lenovo on 2017-06-27.
 * @author:chaoxueling
 * @date:2017-06-27
 * @desc:点评标签
 */

import CommonModel from './CommonModel';
export default class resultData {

  _convert(data) {
    if (data) {
      data._convert = true;
      return data;
    }
  }
  //获取点评结果集合
  resultList(parms) {
    let resultData = CommonModel.post('/api-alibi/api/result/getResult', parms).then(data => {
      return data;
    });
    return resultData;
  }
  //新增点评
  addResult(parms){
    let addResult = CommonModel.post('/api-alibi/api/result/addResult', parms).then(data => {
      return data;
    });
    return addResult;
  }
  //修改点评
  editResult(parms){
    let editResult = CommonModel.post('/api-alibi/api/result/modifyResult', parms).then(data => {
      return data;
    });
    return editResult;
  }

}


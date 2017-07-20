/**
 * Created by lenovo on 2017-06-27.
 * @author:chaoxueling
 * @date:2017-06-27
 * @desc:点评标签
 */

import CommonModel from './CommonModel';
export default class commentModel {

  _convert(data) {
    if (data) {
      data._convert = true;
      return data;
    }
  }

  //获取标签列表
  lableList(parms) {
    let commentData = CommonModel.post('/api-alibi/api/label/getLabel', parms).then(data => {
      return data;
    });
    return commentData;
  }

  //添加标签
  addLabel(parms) {
    let addResult = CommonModel.post('/api-alibi/api/label/addLabel', parms).then(data => {
      return data;
    })
    return addResult;
  }

  //编辑标签
  editLabel(parms) {
    let editResult = CommonModel.post('/api-alibi/api/label/modifyLabel', parms).then(data => {
      return data;
    });
    return editResult;
  }


}


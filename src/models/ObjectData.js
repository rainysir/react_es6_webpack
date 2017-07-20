/**
 * Created by XiaoYu on 2017/6/22.
 * 点评数据层
 */
import CommonModel from './CommonModel';
export default class commentModel {

  _convert(data) {
    if (data) {
      data._convert = true;
      return data;
    }
  }
  //获取点评列表
  commentList(parms) {
    let commentData = CommonModel.post('/api-alibi/api/object/getObject', parms).then(data => {
      return data;
    });
    return commentData;
  }
  //新增点评
  addComment(parms){
    let addResult = CommonModel.post('/api-alibi/api/object/addObject', parms).then(data => {
      return data;
    });
    return addResult;
  }
  //修改点评
  editComment(parms){
    let editResult = CommonModel.post('/api-alibi/api/object/modifyObject', parms).then(data => {
      return data;
    });
    return editResult;
  }

}


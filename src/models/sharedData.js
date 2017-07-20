/**
 * Created by XiaoYu on 2017/6/22.
 * 分享数据层
 */
import CommonModel from './CommonModel';
export default class sharedModel {

  _convert(data) {
    if (data) {
      data._convert = true;
      return data;
    }
  }
  //获取点评列表
  sharedList(parms) {
    let commentData = CommonModel.post('/api-alibi/api/shared/getShared', parms).then(data => {
      return data;
    });
    return commentData;
  }
  //修改点评
  editShared(parms){
    let editResult = CommonModel.post('/api-alibi/api/shared/modifyShared', parms).then(data => {
      return data;
    });
    return editResult;
  }

}


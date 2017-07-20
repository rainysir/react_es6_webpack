/**
 * Created by lenovo on 2017-06-27.
 * @author:chaoxueling
 * @date:2017-06-27
 * @desc:点评标签
 */

import CommonModel from './CommonModel';
export default class replyData {

  _convert(data) {
    if (data) {
      data._convert = true;
      return data;
    }
  }
  //获取点评h回复集合
  replyList(parms) {
    let replyData = CommonModel.post('/api-alibi/api/reply/getReply', parms).then(data => {
      return data;
    });
    return replyData;
  }
}


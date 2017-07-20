/**
 * Created by XiaoYu on 2017/6/28.
 */
import CommonModel from './CommonModel';
export default class reviewModel {

  _convert(data) {
    if (data) {
      data._convert = true;
      return data;
    }
  }
  //获取点评列表
  reviewList(parms) {
    let reviewListData = CommonModel.post('/api-alibi/api/review/getReview', parms).then(data => {
      return data;
    });
    return reviewListData;
  }
  //名称列表
  nameList(parms) {
    let nameListData = CommonModel.post('/api-alibi/api/review/getTypes', parms).then(data => {
      return data;
    });
    return nameListData;
  }
  //点评上架
  upReview(parms) {
    let upReviewData = CommonModel.post('/api-alibi/api/review/upReview'+ parms,{
      "Content-Type": 'application/x-www-form-urlencoded',
    }).then(data => {
      return data;
    });
    return upReviewData;
  }
  //点评下架
  downReview(parms) {
    let downReviewData = CommonModel.post('/api-alibi/api/review/downReview'+ parms).then(data => {
      return data;
    });
    return downReviewData;
  }
}

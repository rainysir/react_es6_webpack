/**
 * Created by XiaoYu on 2017/6/22.
 * 点评数据层
 */
import CommonModel from './CommonModel';
export default class suggestionModel {

  _convert(data) {
    if (data) {
      data._convert = true;
      return data;
    }
  }
  //获取点评列表
  suggestionList(parms) {
    let commentData = CommonModel.post('/api-alibi/api/suggestion/getSuggestion', parms).then(data => {
      return data;
    });
    return commentData;
  }
  //修改点评
  editSuggestion(parms){
    let editResult = CommonModel.post('/api-alibi/api/suggestion/modifySuggestion', parms).then(data => {
      return data;
    });
    return editResult;
  }
  //名称列表
  nameList(parms) {
    let nameListData = CommonModel.get('/api-alibi/api/suggestion/getSugQuestType', parms).then(data => {
      return data;
    });
    return nameListData;
  }
}


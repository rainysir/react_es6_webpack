/**
 * Created by yinchun.ling on 2017/1/10.
 */
import React, {Component} from "react";
import {Button, notification, Icon} from 'antd';

//公共方法类
export default {
  /**
   * 提示框BOX
   * @param type 图标类型 success /warning /error
   * @param content 提示内容
   */
  showNotificationBox(type, content, time){
    let type2 = !!type ? type : 'info';
    let duration = (time == 0 || !!time) ? time : 3;

    notification[type2]({
      message: '提示',
      description: content,
      duration: duration
    });
  },
  /**
   * cookie获取
   */
  getCookie(name){
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arrName = arr[i].split('=');
      if (arrName[0] == name) {
        return arrName[1];
      }
    }
    return '';
  },
  fillZero(value){
    if(value.toString().length<2){
      return "0"+value;
    }
    return value;
  },
  /**
   * 时间格式化
   * @param str 例"dd日MM月yyyy年 HH:mm:ss"
   * @param d 时间
   * @returns {*}
     */
  dateFormat(str,d) {
    if(!d || d==null || typeof(d) == "undefined" || d == ""){  //如果日期为空，自动获取当前日期
      d = new Date();
    }else if(d.constructor!=Date){//如果参数不是一个日期对象，自动获取当前日期
      d = new Date(d);
    }
    return  str.replace("yyyy",d.getFullYear()).replace("MM",this.fillZero(d.getMonth()+1)).replace("dd",this.fillZero(d.getDate())).replace("HH",this.fillZero( d.getHours())).replace("mm",this.fillZero(d.getMinutes())).replace("ss",this.fillZero(d.getSeconds())).replace("sss",d.getMilliseconds());
  }
}

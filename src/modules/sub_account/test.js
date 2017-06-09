import { Form, Input, Select, Button, Modal } from 'antd';
import { EditableTable } from './account_table';
import './style.scss';
import AccountModel from '../../models/accountData';
import CommonFun from '../../components/util/utils';//公共方法
import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react'
import { browserHistory } from 'react-router'

const { BMap = '' } = window
class AddrBumap extends React.Component {
  constructor(props) {
    super(props);
    let map = new BMap.Map("container");
    this.state = {
      addrnameStr:""
    }
    console.log(this.format("hi! ${name}", {name: "lxjwlt"}));
  }
  componentDidMount() {
    this.handleMapfn()
  }

  test(a){
    alert(a);
  }

  format (template, data) {
    var keys = Object.keys(data),
      dataList;

    dataList = keys.map(function (key) {
      return data[key]
    });

    // 这里使用反引号来构建模板引擎
    return new Function(keys.join(','), 'return `' + template + '`;')
      .apply(null, dataList);
  }
  handleMapfn(geoPoint) {
    const { Point } = window.BMap
    const map = new BMap.Map(this.mapContainer)
    const point = new Point(125.31364243, 43.89833761)
    const addrnameStr = "fagshdjklads"
    this.setState({
      addrnameStr:addrnameStr
    });
    map.centerAndZoom(point, 18)
    const icon = { w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5 }
    const iconImg = new BMap.Icon('../img/addrIcon.png', new BMap.Size(icon.w, icon.h), { imageOffset: new BMap.Size(-icon.l, -icon.t), infoWindowOffset: new BMap.Size(icon.lb + 5, 1), offset: new BMap.Size(icon.x, icon.h) })
    const marker = new BMap.Marker(point, iconImg)
    // const marker = new BMap.Marker(point)
    map.addOverlay(marker)
    const opts = {
      minWidth: 500,
      Height:   'auto',
      title:    "111",
    }


    // const click = () => {
    //   return this.handleCopyData(addrTitlename)
    // }

    // const iw = new BMap.InfoWindow(`<div class='iw_poi_content'>地址：${ addrnameStr }<span class='iw_poi_warp' onclick={ ${ () => this.handleCopyData(addrTitlename) } }><span class='iw_poi_copy'>复制粘贴</span><span class='iw_poi_img'></span></span></div>`, opts)
    // const str = '<div class="iw_poi_content">地址：' + addrnameStr + '<span class="iw_poi_warp" onclick="' + this.handleCopyData + '"><span class="iw_poi_copy">复制粘贴</span><span class="iw_poi_img"></span></span></div>'
    const str = `<div class="iw_poi_content">地址：${ addrnameStr }<span class="iw_poi_warp"><span class="iw_poi_copy" onclick="(${this.test})(addrnameStr)">复制粘贴</span><span class="iw_poi_img"></span></span></div>`
    //const str = this.format('<div class="iw_poi_content">地址：${ addrnameStr }<span class="iw_poi_warp"><span class="iw_poi_copy" onclick="function(){${fun}}">复制粘贴</span><span class="iw_poi_img"></span></span></div>', {addrnameStr: "22222",fun:"alert(123)"})
    //const a = '<div class="iw_poi_content">地址:'
    //const b = '111'
    //const c = '<span class="iw_poi_warp"><span class="iw_poi_copy" onclick="'
    //const d = "(function(){alert(1)})()"
    //const e = '">复制粘贴</span><span class="iw_poi_img"></span></span></div>'
    //
    //const arr = new Array();
    //arr.push(a)
    //arr.push(b)
    //arr.push(c)
    //arr.push(d)
    //arr.push(e)
    //const str=arr.join("");
    //console.log(str);
    const iw = new BMap.InfoWindow(str, opts)
    map.openInfoWindow(iw, point)
  }
  render() {
    // 百度地图API功能
    return (
      <div className='addrBumapWrap' style={{ width: '100%', height: '750px', borderBottom: '1px solid #eee' }}>
        <div className='addrBumapMain' style={{ width: '100%', height: '750px', borderBottom: '1px solid #eee' }}>
          <div className='pak' ref={ node => this.mapContainer = node }  style={{ width: '100%', height: '100%', borderBottom: '1px solid #eee' }} ></div>
        </div>
      </div>
    )
  }
}

export default AddrBumap


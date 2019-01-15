// 页面与安卓或ios的交互
export const u = navigator.userAgent
export const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
export function interactiveBridge (sendName, receiveName, sendData, receiveCallback) {
  if (isiOS) {
    // ios终端
    setupWebViewJavascriptBridge(function (bridge) {
      // 注册任务
      bridge.registerHandler(receiveName, function (data, responseCallback) {
        receiveCallback(data)
      })
      // 发布任务
      bridge.callHandler(sendName, sendData, function (response) {
      })
    })
  } else {
    // android终端
    // 发布任务
    (function () {
      try {
        // eslint-disable-next-line
        javascript:android[sendName](JSON.stringify(sendData))
      } catch (e) {
      }
    })()
    // 这个方法用于接收code
    window[receiveName] = function (data) {
      receiveCallback(data)
    }
  }
}

function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}
/* eslint-disable quotes */
// ==============设置cookie========================
export function setCookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = "expires=" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + "; " + expires
}

// ==============获取cookie=====================
export function getCookie (cname) {
  var name = cname + "="
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1)
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
  }
  return ""
}

// ==============清除cookie=====================
export function clearCookie (name) {
  setCookie(name, "", -1)
}
// ====================赛季时间=================
export function getRaceTime(){
  var year= new Date().getFullYear()
  var m= new Date().getMonth() + 1
  var date=year+'-'+m;
  var month=date.substring(5,date.length);
  //获取本月的第一天日期
  var firstdate = toNum(month) + '.' +'01';
  var day = new Date(year,month,0);
  //获取本月最后一天日期
  var lastdate = toNum(month) + '.' + day.getDate();
  var raceDate=firstdate+'-'+lastdate

  return {
    m,
    raceDate
  }
}
function toNum(num){
  if(num>10){
    return num
  }else{
    return '0'+num
  }
}


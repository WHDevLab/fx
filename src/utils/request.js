import {createBrowserHistory} from 'history';
import {fetch as fetchPolyfill} from 'whatwg-fetch';
import {getCookie} from  './authService'
import {message} from 'antd'
const hashHistory = createBrowserHistory();

export default function request (method, url, params, success, failure) {
  method = method.toUpperCase();
  var body = undefined
  if (method === 'GET') {
    if (url.charAt(url.length-1) != "?") {
      url = url+"?"
    }

    for (var key in params) {
      url = url+key+"="+params[key]+"&"
    }
    
    url = url.substring(0, url.length-1)
  } else {
    body = params && JSON.stringify(params);
  }

  console.log(url)
  mobxMap["app"].showLoading()
  
  let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'access_token': getCookie('access_token') || '' // 从sessionStorage中获取access token
  }
  fetch(url, {
    method:method,
    headers: headers,
    body:body,
    redirect:'follow',
  }).then((res) => {
    return res.json()
  })
    .then((res) => {
      console.log(res)
      mobxMap["app"].hideLoading()
      var code = res['code']
      if (code == 200){
        success(res['data'])
      }
      else if (code == 401){
        alert('登录失效')
        hashHistory.push('/login');
      }else{
        message.error(res['msg'])
      }
    }).catch((err) => {
      mobxMap["app"].hideLoading()
      console.log(err)
      if (failure) {
        failure(err)
      }
      
    })
}

export const GET = (url, params, success, failure) => request('GET', url, params, success, failure);
export const POST = (url, params, success, failure) => request('POST', url, params, success, failure);

export var mobxMap = {"cc":"11"}
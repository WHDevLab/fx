import {CookieDomain} from './config'
import Cookies from 'universal-cookie'
const cookie = new Cookies()

let cookieConfig = {}
cookieConfig = { domain: CookieDomain }

export function saveCookie(name,value) {
  cookie.set(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookie.get(name)
}

export function removeCookie(name) {
  cookie.remove(name, cookieConfig)
}

export function isLogin() {
  return !!getCookie('access_token')
}

export function userProfile() {
  return getCookie('profile')
}

export function logout(){
  removeCookie('access_token')
  removeCookie('refresh_token')
  removeCookie('name')
}

// export function loginDataSet(json){
//   saveCookie('username', json.profile.username)
//   saveCookie('access_permission', json.access_permission)
//   saveCookie('token', json.access_token)
//   if (!json.profile.head_pic_url) {
//     json.profile.head_pic_url=''
//   }
//   console.log(json)
//   saveCookie('profile', json.profile)
//   removeCookie('staff')
// }
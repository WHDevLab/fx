import React, { Component } from 'react'
import './index.css'
import {isLogin, logout, userProfile} from '../utils/authService'
import {POST} from '../utils/request'

class Header extends Component {
  constructor(props){
    super(props)
    this.onConsole = this.onConsole.bind(this)
    this.logout = this.logout.bind(this)
    this.doLogin = this.doLogin.bind(this)

    this.state = {
      "isLogin":isLogin()
    }
  }
  componentDidMount(){

  }
  logout(){
    POST('/open/logout', {}, ()=>{
      logout()
    })
  }

  doLogin(){
    POST('/open/login', {}, (res)=>{
      
    })
  }
  onConsole(){
    this.props.history.push("/console")
  }
  render() {
    return (
      <div className="App-header">
        <div className="width-limit">
          <a className="logo" href='/'>
            伏羲
          </a>
          <ul className="nav">
            <li className="nav-item">文档中心</li>
            <li className="nav-item">工单支持</li>
            <li className="nav-item">平台公告</li>
            <li className="nav-item" onClick={this.onConsole}>控制台</li>
          </ul>
          
          <div className="fr">
            {this.state.isLogin == false && <div className="user-info" onClick={this.doLogin}>
              <span>
              <a>登录</a>
              </span>
            </div>}
            {this.state.isLogin && <div className="user-info" onClick={this.logout}>
              <span>
                <a>退出</a>
              </span>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
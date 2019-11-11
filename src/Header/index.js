import React, { Component } from 'react'
import './index.css'
import { Menu, Icon } from 'antd';
import {isLogin, logout} from '../utils/authService'
class Header extends Component {
  constructor(props){
    super(props)
    this.onConsole = this.onConsole.bind(this)
    this.doLogin = this.doLogin.bind(this)

    this.state = {
      "isLogin":false
    }
  }
  componentDidMount(){
    this.setState({
      isLogin:isLogin()
    })
  }
  doLogin(){
    if (isLogin()) {
      logout()
      this.setState({
      isLogin:false
    })
    }
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
            <div className="user-info" onClick={this.doLogin}>
              <span>
                {this.state.isLogin == false && <a href="http://passport.breaker.club?redirectURL=http://fx.breaker.club">登录</a>}
                {this.state.isLogin && <a>退出</a>}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
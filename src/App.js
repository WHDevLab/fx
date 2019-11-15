import React, { Component } from 'react'
import { renderRoutes, matchRoutes } from 'react-router-config'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import {Spin} from 'antd'
import {isLogin} from './utils/authService'
import {mobxMap} from './utils/request'
class App extends Component {
  constructor(props){
    super(props)
    mobxMap["app"] = this
    this.showLoading = this.showLoading.bind(this)
    this.hideLoading = this.hideLoading.bind(this)
    console.log(props)
    this.state = {
      "loading":false
    }

  }

  componentDidMount(){
    
  }

  showLoading(){
    this.setState({ loading: true });
  }

  hideLoading(){
    this.setState({ loading: false });
  }
  render() {
    let pathname = window.location.pathname
    let matchResult = matchRoutes(this.props.route.routes, window.location.pathname)[0]
    if (matchResult.route.requiresAuth == true) {
      if (isLogin() == false) {
        window.location.href = "http://passport.breaker.club/login?redirectUrl="+document.location.href
        return (<div></div>)
      }
    }
    return (
      <div className="rootContainer">
        <Spin spinning={this.state.loading}>
        <Header history ={this.props.history}/>
        <div className='contentContainer'>
          {renderRoutes(this.props.route.routes)}
        </div>
        </Spin>
      </div>
    )
  }
}

export default App;

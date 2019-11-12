import React, { Component } from 'react'
import { renderRoutes, matchRoutes } from 'react-router-config'
import './App.css'
import Header from './Header'
import Footer from './Footer'

import {isLogin} from './utils/authService'
class App extends Component {
  constructor(props){
    super(props)
    console.log(props)
  }

  componentDidMount(){
    
  }

  render() {
    let pathname = window.location.pathname
    let matchResult = matchRoutes(this.props.route.routes, window.location.pathname)[0]
    if (matchResult.route.requiresAuth == true) {
      if (isLogin() == false) {
        window.location.href = "http://passport.breaker.club?redirectURL=http://fx.breaker.club"
        return (<div></div>)
      }
    }
    return (
      <div className="rootContainer">
        <Header history ={this.props.history}/>
        <div className='contentContainer'>
          {renderRoutes(this.props.route.routes)}
        </div>
      </div>
    )
  }
}

export default App;

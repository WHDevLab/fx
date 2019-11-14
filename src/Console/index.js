import React, { Component } from 'react'
import './index.css'
import {fetch as fetchPolyfill} from 'whatwg-fetch'
import { Button } from 'antd';
import {GET} from '../utils/request'
class Console extends Component {
  constructor(props) {
    super(props)
    this.gotoProject = this.gotoProject.bind(this)
    this.createProject = this.createProject.bind(this)
    this.onTest = this.onTest.bind(this)
    this.state = {
      "list":[]
    }
    
  }
  componentDidMount(){
    var self = this
    GET("http://api.breaker.club/project/list", {},(res)=> {
      self.setState({
        "list":res['list']
      })
    })
  }

  createProject(){
    this.props.history.push("/createProject")
  }
  gotoProject(appkey){
    this.props.history.push("/project/"+appkey)
  }

  onTest(){
    GET("http://api.breaker.club/test", {},(res)=> {
      
    })
  }

  render() {
    console.log(this.state.list)
    return (
      <div className='App-Console'>
        <ul>
          <li className="pj_add" onClick={this.createProject}>
          </li>
          {
            this.state.list.map((item) => {
              return (<li className="pj_item">
              <div className="info">
                <div className="title">{item['title']}</div>
                <div>appKey: <span className="appkey">{item["appkey"]}</span></div>
              </div>
              <div className="action">
                <Button>详情</Button>
                <Button onClick={this.gotoProject.bind(this, item["appkey"])}>证书管理</Button>
              </div>
              </li>)
            })
          }
          
        </ul>
      </div>
    );
  }
}

export default Console;
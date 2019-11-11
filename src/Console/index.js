import React, { Component } from 'react'
import './index.css'
import {fetch as fetchPolyfill} from 'whatwg-fetch'
import { Button } from 'antd';
class Console extends Component {
  constructor(props) {
    super(props)
    this.gotoProject = this.gotoProject.bind(this)
    this.createProject = this.createProject.bind(this)
    
  }
  componentDidMount(){

  }

  createProject(){
    this.props.history.push("/createProject")
  }
  gotoProject(appkey){
    this.props.history.push("/project?appkey="+appkey)
  }

  render() {
    return (
      <div className='App-Console'>
        <ul>
          <li className="pj_add" onClick={this.createProject}>
          </li>
          <li className="pj_item">
            <div className="info">
              <div className="title">SoMi</div>
              <div>appKey: <span className="appkey">12312</span></div>
            </div>
            <div className="action">
              <Button onClick={this.gotoProject.bind(this, 123)}>应用管理</Button>
              <Button>删除应用</Button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Console;
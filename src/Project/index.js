import React, { Component } from 'react'
import request, {get} from '../utils/request';
import './index.css'
import {fetch as fetchPolyfill} from 'whatwg-fetch'
import { Button,Menu, Table, Spin, Icon, Modal, Form, Input} from 'antd';
export var columnMap = {
      "pri": [
        {"title":"NAME","dataIndex":"name","key":"name",},
        {"title":"PLATFORM","dataIndex":"platform","key":"platform",},
        {"title":"TYPE","dataIndex":"type","key":"type",},
        {"title":"EXPIRATION","dataIndex":"expiration","key":"expiration"},
        {"title":"Action", "key":"action", "render":(text, record) => {
          <Button type="primary" icon="download">
            Download
          </Button>
        }}
      ],
      "cer": [
        {"title":"NAME","dataIndex":"name","key":"name"},
        {"title":"TYPE","dataIndex":"type","key":"type"},
        {"title":"PLATFORM","dataIndex":"platform","key":"platform"},
        {"title":"CREATED BY","dataIndex":"createby","key":"createby"},
        {"title":"EXPIRATION","dataIndex":"expiration","key":"expiration"}
      ],
      "dev": [
        {"title":"NAME","dataIndex":"name","key":"name",},
        {"title":"IDENTIFIER","dataIndex":"identifier","key":"identifier"}, 
        {"title":"TYPE","dataIndex":"type","key":"type"}, 
        {"title":"CREATEDATE","dataIndex":"createdate","key":"createdate"}
      ],
      "ide": [
        {"title":"NAME","dataIndex":"name","key":"name",},
        {"title":"IDENTIFIER","dataIndex":"identifier","key":"identifier"}, 
        {"title":"PLATFORM","dataIndex":"platform","key":"platform"}
      ]
    }

class Project extends Component {
  constructor(props) {
    super(props)

    this.beginLoading = this.beginLoading.bind(this)
    this.endLoading = this.endLoading.bind(this)
    this.refresh = this.refresh.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {
      columns:[],
      data:[],
      title:"None",
      isloading:false,
      current:"cer",
      visible:false,
    }

  }
  componentDidMount(){
    this.refresh()
  }

  refresh(){
    this.beginLoading()

    var map = {"cer":"/apple/certificates", "pri":"/apple/profiles","dev":"/apple/devices","ide":"/apple/identifiers"}

    fetch("http://api.breaker.club"+map[this.state.current]).then(res => res.json()).then((data) => {
      this.endLoading()
      data = data["data"]
      var list = data['list']
      this.setState({
        list:list,
        title:data["title"]
      })
    })
  }

  handleClick = e => {
    this.setState({
      visible:false
    })
    this.setState({
      current: e.key,
    }, () => {
      this.refresh()
    })
  };

  beginLoading(){
    this.setState({
        isloading:true,
      })
  }

  endLoading(){
    this.setState({
        isloading:false,
      })
  }

  handleOk(){
    if (this.state.current == "dev") {
      this.beginLoading()
      let name = this.refs.name.state.value
      let udid = this.refs.udid.state.value
      fetch("http://127.0.0.1:5000/apple/registerDevice", {
        method:"POST",
        body:JSON.stringify({"name":name, "udid":udid})
      }).then(res => res.json()).then((data) => {
        this.endLoading()
        console.log(data)
      })
    }
    

  }

  handleCancel(){
    this.setState({
      visible:false
    })
  }

  handleAdd(){
    this.setState({
      visible:true
    })
  }
  render() {
    var columns = columnMap[this.state.current]
    return (
      <div className='App-Project'>
        <div className="menu">
          <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} >
            <Menu.Item key="cer">Certificates</Menu.Item>
            <Menu.Item key="ide">Identifiers</Menu.Item>
            <Menu.Item key="dev">Devices</Menu.Item>
            <Menu.Item key="pri">Profiles</Menu.Item>
          </Menu>
        </div>
        <div className="list">
          <div className="title">{this.state.title}<Button onClick={this.handleAdd}><Icon type="plus" /></Button></div>
          <Table columns={columns} dataSource={this.state.list} />
        </div>

        {this.state.isloading==true && <div className="example">
          <Spin size="large"/>
        </div>}

        {this.state.current == "dev" && <Modal
          title="新增设备ID"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="名称" ref="name"></Input>
          <Input placeholder="UDID" ref="udid"></Input>
        </Modal>}

        {this.state.current == "pri" && <Modal
          title="新增描述文件"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="名称"></Input>
          <Input placeholder="UDID"></Input> 
        </Modal>}

        {this.state.current == "ide" && <Modal
          title="新增BundleId"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="名称"></Input>
          <Input placeholder="bundleId"></Input> 
        </Modal>}
      </div>
    );
  }
}

export default Project;
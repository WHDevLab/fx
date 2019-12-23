import React, { Component } from 'react'
import request, {GET, POST} from '../utils/request';
import './index.css'
import {fetch as fetchPolyfill} from 'whatwg-fetch'
import {Button, Menu, Modal, Form, Input, Icon, Table, Divider} from 'antd'
import {Base64}  from 'js-base64';
class Project extends Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
	this.handleCancel = this.handleCancel.bind(this)
	this.downloadAction = this.downloadAction.bind(this)
	this.b64toBlob = this.b64toBlob.bind(this)
    this.state = {
      columns:[],
      data:[],
      title:"None",
      current:"pri",
      visible:false,
	}

	this.columnMap = {
		"pri": [
		  {"title":"NAME","dataIndex":"name","key":"name",},
		  {"title":"PLATFORM","dataIndex":"platform","key":"platform",},
		  {"title":"TYPE","dataIndex":"type","key":"type",},
		  {"title":"EXPIRATION","dataIndex":"expiration","key":"expiration"},
		  {title:"Action", key:"action", render:(item, record) => {
			  return (<Button type="primary" onClick={this.downloadAction.bind(this, item)}>Download</Button>)
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

  }
  componentDidMount(){
    this.refresh()
  }

  refresh(){
    var map = {"cer":"/apple/certificates", "pri":"/apple/profiles","dev":"/apple/devices","ide":"/apple/identifiers"}

    GET(map[this.state.current], {"appkey":this.props.match.params.appkey},(res)=> {
      this.setState({
        list:res['list'],
        title:res["title"]
      })
    })
  }

  downloadAction(item) {
// 	let profileContent = item["profileContent"]
// 	let name = item["name"]
// 	var b64Data=Base64.decode(profileContent)
// 	const blob = b64toBlob(b64Data, 'application/octet-stream');
// 	const u = window.URL.createObjectURL(blob)
// 	let a = document.createElement('a') // 动态创建a链接
//  　  document.body.appendChild(a)
//      a.href = u
//     let setDownloadName = name+'.mobileprovision' // 默认下载的文件名
//     a.download = setDownloadName
//     a.click()
//     window.URL.revokeObjectURL(u) // 移除动态创建的a链接
  }

   b64toBlob = (b64Data, contentType='', sliceSize=512) => {
	const byteCharacters = atob(b64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	  const slice = byteCharacters.slice(offset, offset + sliceSize);

	  const byteNumbers = new Array(slice.length);
	  for (let i = 0; i < slice.length; i++) {
		byteNumbers[i] = slice.charCodeAt(i);
	  }

	  const byteArray = new Uint8Array(byteNumbers);
	  byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, {type: contentType});
	return blob;
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

  handleOk(){
    if (this.state.current == "dev") {
      let name = this.refs.name.state.value
      let udid = this.refs.udid.state.value

      POST("/apple/registerDevice", {"name":name, "udid":udid}, (data)=> {
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
    var columns = this.columnMap[this.state.current]
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

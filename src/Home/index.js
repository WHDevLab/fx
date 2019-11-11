import React, { Component } from 'react'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import {fetch as fetchPolyfill} from 'whatwg-fetch'
class Software extends Component {
  constructor(props) {
    super(props)
    
  }
  componentDidMount(){

  }

  render() {
    return (
      <div className='App-Home'>
        <div className='banner'>
        	<div className="slogan">
        		再小的个体，也有自己的品牌
        	</div>
        </div>
      </div>
    );
  }
}

export default Software;
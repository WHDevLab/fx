import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import renderRoutes from './renderRoutes'

class RouterGuard extends Component {
    constructor(props) {
        super()
    }
    componentWillMount() {
        let { history: { replace }, authorization, location } = this.props
        if (authorization) replace('./login')
        if (location.pathname === '/') replace('./asd')
        console.log('路由跳转前的拦截', this.props)
    }
    render() {
        let { component, routes = [] } = this.props
        return (
            <div>
                {renderRoutes(routes)}
            </div>

        )
    }
}

export default RouterGuard
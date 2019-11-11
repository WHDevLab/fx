import {React, Redirect} from "react";
import Switch from "react-router/Switch";
import Route from "react-router/Route";
import App from '../App'
const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={ (props) => {
              if (route.requiresAuth || route.path == '/login') {

                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
              }
              return <route.component {...props} {...extraProps} route={route} />
            }
          }
        />
      ))}
    </Switch>
  ) : null;
 export default renderRoutes;
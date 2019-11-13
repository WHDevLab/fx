import App from './App'
import NotFound from './NotFound'
import Home from './Home'
import Console from './Console'
import Project from './Project'
import CreateProject from './CreateProject'


const routes = [
  { component: App,
    routes: [
    { path: '/',
      exact: true,
      component: Home,
    },
    { path: '/console',
      component: Console,
      requiresAuth:true,
    },
    { path: '/project/:appkey',
      component: Project,
    },
    { path: '/project/create',
      component: CreateProject,
    },
    {
      path: '*',
      component: NotFound
    }
  ]
  }
]


export default routes
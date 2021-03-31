import React  from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import routes from '@/router'

function App() {
  return (
    <Router>
      <Switch>
        {
          routes.map(item=>(
            <Route exact key={item.path} path={item.path}>
              <item.component />
            </Route>
          ))
        }
      </Switch>
    </Router>
  )
}

export default App

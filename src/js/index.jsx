import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {configureStore} from './configureStore'
import App from './components/App'
import Home from './components/Home'
import Search from './components/Search'
import Data from './components/Data'
import Analytics from './components/Analytics'
import Settings from './components/Settings'

injectTapEventPlugin()

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route
        component={App}
        path='/'
      >
        <Route
          component={Analytics}
          path='analytics'
        />
        <Route
          component={Data}
          path='data'
        />
        <Route
          component={Home}
          path='home'
        />
        <Route
          component={Search}
          path='search'
        />
        <Route
          component={Settings}
          path='settings'
        />
      </Route>
      <Route
        component={App}
        path='*'
      />
    </Router>
  </Provider>
), document.querySelector('.app'))
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import store from './appStore'


import HomeLayout from './HomeLayout.container'

injectTapEventPlugin()

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <HomeLayout />
  </MuiThemeProvider>
</Provider>, app)
      // <Route path='/' component={NewAppRun} />

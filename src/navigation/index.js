import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'

export default class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={()=><Home />} />
          <Route exact path="/signin" component={()=><Signin />} />
          <Route exact path="/signup" component={()=><Signup />} />
          {/* <Route render={()=><NotFoundScreen />} /> */}
        </Switch>
    </Router>
    )
  }
}

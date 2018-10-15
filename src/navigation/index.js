import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import CheckFine from '../pages/CheckFine'

export default class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={()=><Home />} />
          <Route path="/signin" component={()=><Signin />} />
          <Route path="/signup" component={()=><Signup />} />
          <Route exact path="/checkFine" component={()=><CheckFine />} />
          {/* <Route render={()=><NotFoundScreen />} /> */}
        </Switch>
    </Router>
    )
  }
}

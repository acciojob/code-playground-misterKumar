import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PrivateRoute from "react-private-route";

import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.login = this.login.bind(this);
  }
  isLoggedIn() {
    return this.state.isLoggedIn;
  }
  login() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }
  render() {
    return (
      <Router>
        <div className={"main-container"}>
          <div>
            {this.isLoggedIn()
              ? "Logged in, Now you can enter Playground"
              : "You are not authenticated, Please login first"}
          </div>
          <div>
            <ul>
              <li>
                <Link to="/home">PlayGround</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route
              path="/login"
              component={() => (
                <Login login={this.login} isLogged={this.state.isLoggedIn} />
              )}
            />
            <PrivateRoute
              exact
              path="/home"
              component={Home}
              isAuthenticated={!!this.isLoggedIn()}
              redirect="/login"
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
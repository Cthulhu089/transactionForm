import React, { Component } from "react";
import "./App.css";
import "./css/spacing.css"
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Transaction from "./views/Transaction/Transaction";
import "antd/dist/antd.css";
const loading = () => <div>Loading...</div>;

class App extends Component {
  render() {
    return (
      <div className="main">
        <Router >
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/" component={Transaction} />
            </Switch>
          </React.Suspense>
        </Router>
      </div>
    );
  }
}
export default App;

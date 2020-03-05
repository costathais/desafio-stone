import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import SearchPage from "./components/SearchPage";
import ResultPage from "./components/ResultPage";
import {
  Redirect
} from 'react-router-dom';

axios.defaults.baseURL = "http://api.github.com";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact={true}>
            <Redirect to="/desafio-stone/" />
          </Route>
          <Route path="/desafio-stone/" exact={true}>
            <SearchPage />
          </Route>
          <Route path="/desafio-stone/user/:userId">
            <ResultPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="with-top-navbar">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Redirect from='*' to='/' />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;

import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter,
  Routes,
  Route,
  useRouteMatch,
} from "react-router-dom";

export default class App extends Component {

  state={
    progress:0,
    apikey:process.env.REACT_APP_NEWS_API
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
        <Route exact path='/' element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="base"pagesize={5} country="in" category="general" />}></Route>
          <Route exact path='/science' element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="science"pagesize={5} country="in" category="science" />}></Route>
          <Route exact path='/general' element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="general" pagesize={5} country="in" category="general" />}></Route>
          <Route exact path='/health' element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="health"pagesize={5} country="in" category="health" />}></Route>
          <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="entertainment"pagesize={5} country="in" category="entertainment" />}></Route>
          <Route exact path='/sports' element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="sports"pagesize={5} country="in" category="sports" />}></Route>
          <Route exact path='/business' element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="business"pagesize={5} country="in" category="business" />}></Route>
          <Route exact path='/technology' element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="technology"pagesize={5} country="in" category="technology" />}></Route>
          <Route exact path='/business' element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="business"pagesize={5} country="in" category="business" />}></Route>
        </Routes>
      </div>
    )
  }
}




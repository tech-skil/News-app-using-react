import React, { Component } from 'react';
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pagesize = 15;
  apikey = import.meta.env.VITE_NEWS_API; 
  
  state = {
    progress: 0,
    searchQuery: ''
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  }

  render() {
    return (  
      <div className='lg:container mx-auto lg:overflow-x-hidden dark:bg-[#273954] dark:text-white'>
        <BrowserRouter>
          <Navbar onSearch={this.handleSearch}/>
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pagesize={this.pagesize} country='in' category="general" searchQuery={this.state.searchQuery} />}/>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pagesize={this.pagesize} country='in' category="business" searchQuery={this.state.searchQuery} />}/>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pagesize={this.pagesize} country='in' category="entertainment" searchQuery={this.state.searchQuery} />}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pagesize={this.pagesize} country='in' category="health" searchQuery={this.state.searchQuery} />}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pagesize={this.pagesize} country='in' category="science" searchQuery={this.state.searchQuery} />}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pagesize={this.pagesize} country='in' category="sports" searchQuery={this.state.searchQuery} />}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pagesize={this.pagesize} country='in' category="technology" searchQuery={this.state.searchQuery} />}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
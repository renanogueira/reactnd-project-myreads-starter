import React from "react";
import { Route } from "react-router-dom";
import ListBooks from "./components/ListBooks";
import Search from "./components/Search";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ListBooks} />
        <Route exact path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp;

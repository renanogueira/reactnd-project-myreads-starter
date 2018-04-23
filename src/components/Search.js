import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import Book from "./Book";
import * as BooksAPI from "../api/BooksAPI";

class Search extends Component {
  state = {
    books: [],
    loading: true,
    results: false,
    term: ""
  };

  componentDidMount() {
    this.search = debounce(this.search, 500);
    this.search();
  }

  search() {
    this.setState({ loading: true });
    if (this.state.term.length > 0) this.searchContent(this.state.term);
    else this.searchAll();
    this.setState({ loading: false });
  }

  async searchAll() {
    await BooksAPI.getAll().then(data => {
      this.setState({ books: data, results: true });
    });
  }

  async searchContent(query) {
    console.log(query);
    await BooksAPI.search(query).then(data => {
      if (data.error) {
        this.setState({ results: false });
      } else {
        this.setState({ books: data, results: true });
      }
    });
    this.setState({ loading: false });
  }

  render() {
    let content;
    let booksNodes;

    if (this.state.loading) {
      content = (
        <div className="search-books-results">
          <div className="search-books-fetching">Fetching results...</div>
        </div>
      );
    } else {
      if (this.state.results) {
        if (this.state.books) {
          booksNodes = this.state.books.map((book, index) => {
            return <Book key={index} data={book} />;
          });
        }
        content = (
          <div className="search-books-results">
            <ol className="books-grid">{booksNodes}</ol>
          </div>
        );
      } else {
        content = (
          <div className="search-books-results">
            <div className="search-books-fetching">No results :(</div>
          </div>
        );
      }
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => {
                this.setState({ term: event.target.value });
                this.search(event.target.value);
              }}
            />
          </div>
        </div>
        {content}
      </div>
    );
  }
}

export default Search;

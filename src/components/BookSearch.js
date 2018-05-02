import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import Book from "./Book";
import * as Api from "../BooksAPI";

export default class BookSearch extends Component {
  state = {
    books: [],
    currentBooks: [],
    loading: false,
    results: true
  };

  componentDidMount() {
    this.handleSearch = this.handleSearch.bind(this);
    this.onSearchDebounced = debounce(this.onSearch, 500);
    Api.getAll().then(books => {
      const booksId = books.map(book => ({ id: book.id, shelf: book.shelf }));
      this.setState({
        currentBooks: booksId,
        results: true
      });
    });
  }

  componentWillUnmount() {
    this.onSearchDebounced.cancel();
  }

  handleSearch(e) {
    this.onSearchDebounced(e.target.value);
  }

  onSearch(query) {
    this.setState({ loading: true });
    const { currentBooks } = this.state;
    if (query) {
      Api.search(query)
        .then(books => {
          books = books.map(book => {
            currentBooks
              .filter(b => b.id === book.id)
              .map(b => (book.shelf = b.shelf));
            return book;
          });
          this.setState({
            books: !books ? [] : books,
            results: true,
            loading: false
          });
        })
        .catch(error => {
          this.setState({ books: [], results: false, loading: false });
        });
    } else {
      this.setState({ books: [], results: true, loading: false });
    }
  }

  onChange = (book, shelf) => {
    const updatedList = [];
    Api.update(book, shelf)
      .then(books => {
        Object.keys(books).map(shelf => {
          return books[shelf]
            .map(bookId => ({ id: bookId, shelf: shelf }))
            .map(book => {
              updatedList.push(book);
            });
        });
        return updatedList;
      })
      .then(updatedList => {
        this.setState({ currentBooks: updatedList });
      });
  };

  render() {
    const { books, results, loading } = this.state;
    let content = (
      <div className="search-books-results">
        <div className="search-books-fetching">Fetching results...</div>
      </div>
    );

    if (!loading) {
      if (results) {
        content = books.map((book, index) => {
          return (
            <li key={index}>
              <Book onChange={this.onChange} book={book} />
            </li>
          );
        });
      } else {
        content = (
          <div className="search-books-results">
            <div className="search-books-fetching">No results found :(</div>
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
              onChange={this.handleSearch}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{content}</ol>
        </div>
      </div>
    );
  }
}

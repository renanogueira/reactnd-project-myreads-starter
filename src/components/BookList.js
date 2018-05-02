import React from "react";
import { Link } from "react-router-dom";
import * as Api from "../BooksAPI";

import BookShelf from "./BookShelf";

export default class BookList extends React.Component {
  state = {
    books: []
  };

  async componentDidMount() {
    const books = await Api.getAll();
    this.setState({ books });
  }

  onShelfChange = (book, shelf) => {
    const id = book.id;
    const currentBooks = [...this.state.books];
    const indexToUpdate = currentBooks.findIndex(book => book.id === id);
    const newBookToUpdate = Object.assign({}, currentBooks[indexToUpdate], {
      shelf: shelf
    });

    this.setState({
      books: [
        ...currentBooks.slice(0, indexToUpdate),
        newBookToUpdate,
        ...currentBooks.slice(indexToUpdate + 1)
      ]
    });

    Api.update(book, shelf);
  };

  onChange = (book, shelf) => {
    const shelfBooks = [...this.state.books];
    const idxUpdate = shelfBooks.findIndex(_book => _book.id === book.id);
    const newBook = Object.assign({}, shelfBooks[idxUpdate], { shelf: shelf });

    this.setState({
      books: [
        ...shelfBooks.slice(0, idxUpdate),
        newBook,
        ...shelfBooks.slice(idxUpdate + 1)
      ]
    });

    Api.update(book, shelf);
  };

  render() {
    const { books } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf books={books} onChange={this.onChange} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

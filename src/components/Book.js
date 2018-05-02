import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Book extends Component {
  render() {
    const { book, onChange } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks
                  ? book.imageLinks.thumbnail
                  : "http://i.imgur.com/1ilVBxc.png"
              })`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={e => {
                onChange(book, e.target.value);
                book.shelf = e.target.value;
              }}
              value={book.shelf ? book.shelf : "none"}
            >
              <option value="" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title ? book.title : null}</div>
        {book.authors &&
          book.authors.map((author, index) => {
            return (
              <div key={index} className="book-authors">
                {author}
              </div>
            );
          })}
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

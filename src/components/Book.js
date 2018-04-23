import React from "react";

class Book extends React.Component {
  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${this.props.data.imageLinks.thumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.data.title}</div>
          {this.props.data.authors &&
            this.props.data.authors.map((author, index) => {
              return (
                <div key={index} className="book-authors">
                  {author}
                </div>
              );
            })}
        </div>
      </li>
    );
  }
}

export default Book;

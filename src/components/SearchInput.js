import React, { Component } from "react";
import PropTypes from "prop-types";

import debounce from "lodash/debounce";

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.changed = debounce(this.props.changed, 250);
  }
  static propTypes = {
    changed: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  };
  handleChange = e => {
    const val = e.target.value;
    this.setState({ value: val }, () => {
      this.changed(val);
    });
  };
  render() {
    return (
      <input
        onChange={this.handleChange}
        value={this.props.value}
        placeholder="Search by title or author"
      />
    );
  }
}

export default SearchInput;

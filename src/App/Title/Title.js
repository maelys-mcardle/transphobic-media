import React, { Component } from 'react';
import './Title.css';

export default class Title extends Component {

  renderEntryCount() {
    return(
      <small className="text-muted entry-count">
        ({this.props.entryCount} Entries)
      </small>
    )
  }

  render() {
    if (this.props.searchTerm.length) {
      return (
        <h2>
          Searching for "{this.props.searchTerm}"
          {this.renderEntryCount()}
        </h2>
      )
    } else {
      return (
        <h2>
          All Titles
          {this.renderEntryCount()}
        </h2>
      )
    }
  }
}

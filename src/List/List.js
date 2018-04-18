import React, { Component } from 'react';
import ListItem from './ListItem/ListItem';
import '../App.css';

export default class List extends Component {

  getListItems() {
    return Object.keys(this.props.entries).map(imdb =>
      <ListItem 
        key={imdb} 
        title={this.props.entries[imdb].title}
        imdb={imdb}
        data={this.props.entries[imdb]} />
    );
  }

  render() {
    return (
      <ul className="list-group">
        {this.getListItems()}
      </ul>
    );
  }
}

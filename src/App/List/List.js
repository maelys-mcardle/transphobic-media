import React, { Component } from 'react';
import ListItem from './ListItem/ListItem';
import PageNav from './PageNav/PageNav';
import './List.css';

export default class List extends Component {

  constructor(props) {
    super(props);
    let itemsPerPage = 20;
    let totalEntries = Object.keys(this.props.entries).length;
    let totalPages = Math.max(
      Math.ceil(totalEntries / itemsPerPage),
      1);
    this.state = {
      totalEntries: totalEntries,
      itemsPerPage: itemsPerPage,
      currentPage: 1,
      totalPages: totalPages
    };
    this.changePage = this.changePage.bind(this);
  }

  getListItems() {
    let listItems = [];
    let itemKeys = Object.keys(this.props.entries);
    for (let entry = (this.state.currentPage - 1) * this.state.itemsPerPage;
      entry < this.state.totalEntries &&
      entry < this.state.currentPage * this.state.itemsPerPage;
      entry++) 
    {
      let imdb = itemKeys[entry];
      listItems.push(
        <ListItem 
          key={imdb} 
          title={this.props.entries[imdb].title}
          imdb={imdb}
          data={this.props.entries[imdb]} />
      )
    }
    return listItems;
  }

  changePage(newPage) {
    this.setState({
      currentPage: newPage
    })
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.getListItems()}
        </ul>
        <PageNav 
          changePage={this.changePage}
          currentPage={this.state.currentPage} 
          totalPages={this.state.totalPages} />
      </div>
    );
  }
}

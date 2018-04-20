import React, { Component } from 'react';
import ListItem from './ListItem/ListItem';
import PageNav from './PageNav/PageNav';
import './List.css';

export default class List extends Component {

  constructor(props) {
    super(props);
    this.itemsPerPage = 20;
    this.state = {
      currentPage: 1,
    };
    this.changePage = this.changePage.bind(this);
  }

  getListItems(totalEntries) {
    let listItems = [];
    let itemKeys = Object.keys(this.props.entries);

    for (let entry = (this.state.currentPage - 1) * this.itemsPerPage;
      entry < totalEntries &&
      entry < this.state.currentPage * this.itemsPerPage;
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

  renderPageNav(totalPages) {
    return (
      <PageNav
        changePage={this.changePage}
        currentPage={this.state.currentPage} 
        totalPages={totalPages} />
    )
  }

  render() {
    let totalEntries = Object.keys(this.props.entries).length;
    let totalPages = Math.max(
      Math.ceil(totalEntries / this.itemsPerPage),
      1);
    if (this.state.currentPage > totalPages) {
      this.setState({
        currentPage: 1
      })
    }
    return (
      <div>
        <ul className="list-group">
          {this.getListItems(totalEntries)}
        </ul>
        {this.renderPageNav(totalPages)}
      </div>
    );
  }
}

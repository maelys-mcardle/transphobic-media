import React, { Component } from 'react';
import './PageNav.css';

export default class PageNav extends Component {

  renderPrevious() {
    let classPrevious = 
      (this.props.currentPage === 1) ?
        "page-item disabled":
        "page-item";
    let previousPageMethod = 
      (this.props.currentPage === 1) ?
        () => {}:
        () => this.props.changePage(this.props.currentPage - 1);
    return (
      <li className={classPrevious}>
        <a className="page-link" tabindex="-1"
          onClick={previousPageMethod}>
          Previous
        </a>
      </li>
    )
  }

  renderNext() {
    let classNext = 
      (this.props.currentPage === this.props.totalPages) ?
        "page-item disabled":
        "page-item";
    let nextPageMethod = 
      (this.props.currentPage === this.props.totalPages)  ?
        () => {}:
        () => this.props.changePage(this.props.currentPage + 1);
    return (
      <li className={classNext}>
        <a className="page-link"
          onClick={nextPageMethod}>
          Next
        </a>
      </li>
    )
  }

  renderPageLinks() {
    let firstPage = Math.max(1, this.props.currentPage - 3);
    let lastPage = Math.min(this.props.totalPages, this.props.currentPage + 3);
    let pageLinks = [];
    for (let page = firstPage; page <= lastPage; page++) {
      let liClass = "page-item";
      let textCurrent = '';
      if (page === this.props.currentPage) {
        liClass += " active";
        textCurrent = (<span className="sr-only">(current)</span>);
      }
      pageLinks.push(
        <li key={page} className={liClass}>
          <a className="page-link"
            onClick={() => this.props.changePage(page)}>
            {page}
            {textCurrent}
          </a>
        </li>
      );
    }
    return pageLinks;
  }

  render() {
    return (
      <nav>
        <ul className="pagination page-nav">
          {this.renderPrevious()}
          {this.renderPageLinks()}
          {this.renderNext()}
        </ul>
      </nav>
    )
  }
}

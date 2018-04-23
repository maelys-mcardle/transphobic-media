import React, { Component } from 'react';
import './NavBar.css';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.criteriaUrl = 
      "https://github.com/maelys-mcardle/transphobic-media/" +
      "blob/master/db/README.md";
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-top">
        <a className="navbar-brand" onClick={this.props.homepageFunction}>
          <i className="fas fa-comments"></i>
          &nbsp;
          <span className="navbar-title d-none d-sm-inline">
            Is it Transphobic?
          </span>
        </a>
        <form className="form-inline my-2 my-lg-0">
          <a className="btn btn-outline-secondary criteria-button d-none d-md-inline"
            rel="noopener noreferrer" 
            href={this.criteriaUrl}
            target="_blank">
            Explanation of Criteria
          </a>
          <input className="form-control mr-sm-2" 
            type="search" 
            placeholder="Search"
            aria-label="Search"
            value={this.props.searchTerm}
            onChange={evt => this.props.searchFunction(evt.target.value)}/>
        </form>
      </nav>
    );
  }
}

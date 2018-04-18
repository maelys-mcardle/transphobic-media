import React, { Component } from 'react';
import './NavBar.css';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-top">
        <span className="navbar-brand">
          <i className="fas fa-comments"></i>
          &nbsp;
          <span className="navbar-title">
            Is it Transphobic?
          </span>
        </span>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" 
            type="search" 
            placeholder="Search"
            aria-label="Search" 
            onChange={evt => this.props.searchFunction(evt.target.value)}/>
        </form>
      </nav>
    );
  }
}

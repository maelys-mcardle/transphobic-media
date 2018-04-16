import React, { Component } from 'react';
import transphobicDb from './transphobic';
import logo from './logo.svg';
import './App.css';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-top">
        <a className="navbar-brand" href="#nowhere">
          <img src={logo}
            className="d-inline-block align-top nav-logo" alt="" />
          Transphobic Media
        </a>
      </nav>
    );
  }
}
class List extends Component {

  getListItems() {
    return Object.keys(this.props.entries).map(imdb =>
      <ListItem 
        key={imdb} 
        title={this.props.entries[imdb].title} 
        transphobia={this.props.entries[imdb].transphobia} />
    );
  }

  render() {
    return (
      <ul class="list-group">
        {this.getListItems()}
      </ul>
    );
  }
}

class ListItem extends Component {

  getBadge() {
    let text = 'Unknown';
    let className = 'badge badge-padding ';

    if (this.props.transphobia === undefined) {
      text = 'Unknown';
      className += 'badge-secondary';
    } else if (this.props.transphobia === null) {
      text = 'N/A';
      className += 'badge-secondary';
    } else if (this.props.transphobia === true) {
      text = 'Warning';
      className += 'badge-danger';
    } else if (this.props.transphobia === false) {
      text = 'No transphobia!';
      className += 'badge-primary';
    }

    return (
      <span className={className}>{text}</span>
    )
  }

  render() {
    return (
      <a 
        href="#test"
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        {this.props.title}
        {this.getBadge()}
      </a>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div class="container">
        <NavBar />
        <h1>List of Titles</h1>
        <List entries={transphobicDb} />
      </div>
    );
  }
}

export default App;

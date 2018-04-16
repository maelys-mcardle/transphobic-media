import React, { Component } from 'react';
import transphobicDb from './transphobic';
import './App.css';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-top">
        <a className="navbar-brand" href="#nowhere">
          <i class="fas fa-comments"></i>
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
    let iconClass = 'fas fa-question';
    let className = 'badge badge-padding ';

    if (this.props.transphobia === undefined) {
      iconClass = 'fas fa-question';
      className += 'badge-secondary';
    } else if (this.props.transphobia === null) {
      iconClass = 'fas fa-minus';
      className += 'badge-secondary';
    } else if (this.props.transphobia === true) {
      iconClass = 'far fa-thumbs-down';
      className += 'badge-danger';
    } else if (this.props.transphobia === false) {
      iconClass = 'far fa-thumbs-up';
      className += 'badge-primary';
    }

    return (
      <span className={className}>
        <i className={iconClass}></i>
      </span>
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
        <h1>All Titles</h1>
        <List entries={transphobicDb} />
      </div>
    );
  }
}

export default App;

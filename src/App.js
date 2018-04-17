import React, { Component } from 'react';
import transphobicDb from './transphobic';
import './App.css';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-top">
        <span className="navbar-brand">
          <i class="fas fa-comments"></i>
          &nbsp;
          <strong><em>Is it Transphobic?</em></strong>
        </span>
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

  constructor(props) {
    super(props);
    this.state = {
      tooltip: false
    };

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  getBadge() {
    let iconClass = 'fas fa-question-circle';
    let className = 'badge badge-padding ';
    let text = 'Unsure'

    if (this.props.transphobia === undefined) {
      iconClass = 'fas fa-question-circle';
      className += 'badge-secondary';
      text = 'Unsure';
    } else if (this.props.transphobia === null) {
      iconClass = 'fas fa-circle';
      className += 'badge-secondary';
      text = 'Not Applicable';
    } else if (this.props.transphobia === true) {
      iconClass = 'fas fa-exclamation-circle';
      className += 'badge-danger';
      text = 'Warning';
    } else if (this.props.transphobia === false) {
      iconClass = 'fas fa-smile';
      className += 'badge-primary';
      text = 'No Transphobia';
    }

    return (
      <span className={className}>
        {this.state.tooltip ? ' ' + text + ' ' : ''}
        <i className={iconClass}></i>
      </span>
    )
  }

  showTooltip() {
    this.setState({
      tooltip: true,
    })
  }

  hideTooltip() {
    this.setState({
      tooltip: false
    })
  }

  render() {
    return (
      <a 
        href="#test"
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        onMouseOver={this.showTooltip}
        onMouseOut={this.hideTooltip}>
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
        <h2>All Titles</h2>
        <List entries={transphobicDb} />
      </div>
    );
  }
}

export default App;

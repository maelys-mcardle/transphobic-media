import React, { Component } from 'react';
import Details from './Details/Details';
import './ListItem.css';

export default class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: false
    };

    this.toggleDetails = this.toggleDetails.bind(this);
  }

  renderBadge() {
    let iconClass = 'fas fa-question-circle';
    let className = 'badge badge-padding ';

    if (this.props.data.transphobic === true) {
      // transphobic
      iconClass = 'fas fa-frown';
      className += 'badge-danger';
    } else if (this.props.data.transphobic === false) {
      if (this.props.data.showsTransphobia === true) {
        // not transphobic
        // shows transphobia
        iconClass = 'fas fa-exclamation-circle';
        className += 'badge-info';
      } else if (this.props.data.showsTransphobia === false ||
                 this.props.data.showsTransphobia === null) {
        // not transphobic
        // shows no transphobia / not applicable
        iconClass = 'fas fa-smile';
        className += 'badge-primary';
      } else {
        // unsure
        iconClass = 'fas fa-question-circle';
        className += 'badge-secondary';
      }
    } else if (this.props.data.transphobic === null) {
      // not applicable
      iconClass = 'fas fa-circle';
      className += 'badge-secondary';
    } else {
      // unsure
      iconClass = 'fas fa-question-circle';
      className += 'badge-secondary';
    }

    if (this.state.details) {
      return '';
    } else {
      return (
        <span className={className}>
          <i className={iconClass}></i>
        </span>
      )
    }
  }

  toggleDetails() {
    this.setState({
      details: !this.state.details
    })
  }

  renderDetails() {
    if (this.state.details) {
      return (
        <Details data={this.props.data} imdb={this.props.imdb} />
      )
    } else {
      return '';
    }
  }

  getUrl() {
    return '#' + this.props.imdb
  }

  renderTitle() {
    // Hide title on mobile devices when the details are shown.

    let className = (this.state.details) ? 
      "d-none d-md-block": 
      "";

    return (
      <span className={className}>
        {this.props.title} <span className="badge badge-secondary">{this.props.type}</span>
      </span>
    );
  }

  render() {
    return (
      <a 
        className="list-group-item cursor-pointer list-group-item-action d-flex justify-content-between align-items-center"
        onClick={this.toggleDetails}>
        {this.renderTitle()}
        {this.renderBadge()}
        {this.renderDetails()}
      </a>
    )
  }
}

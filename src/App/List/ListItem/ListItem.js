import React, { Component } from 'react';
import Details from './Details/Details';
import './ListItem.css';

export default class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tooltip: false,
      details: false
    };

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  getBadge() {
    let iconClass = 'fas fa-question-circle';
    let className = 'badge badge-padding ';
    let text = ''

    if (this.props.data.transphobic === null) {
      iconClass = 'fas fa-circle';
      className += 'badge-secondary';
      text = 'Not Applicable';
    } else if (this.props.data.transphobic === true) {
      iconClass = 'fas fa-exclamation-circle';
      className += 'badge-danger';
      text = 'Warning';
    } else if (this.props.data.transphobic === false &&
               this.props.data.showsTransphobia === true) {
      iconClass = 'fas fa-exclamation-circle';
      className += 'badge-info';
      text = 'Warning';
    } else if (this.props.data.transphobic === false &&
               this.props.data.showsTransphobia === false) {
      iconClass = 'fas fa-smile';
      className += 'badge-primary';
      text = 'No Transphobia';
    } else {
      iconClass = 'fas fa-question-circle';
      className += 'badge-secondary';
      text = 'Unsure';
    }

    if (this.state.details) {
      return '';
    } else {
      return (
        <span className={className}>
          <span className="d-none d-md-inline">
            {this.state.tooltip ? ` ${text} ` : ''}
          </span>
          <i className={iconClass}></i>
        </span>
      )
    }
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

  renderType() {
    let icon = this.props.type.startsWith('tv') ?
      "fas fa-tv":
      "fas fa-film";

    return (
      <div className="type-icon">
        <i className={icon}></i>
      </div>
      );
  }

  renderTitle() {
    // Hide title on mobile devices when the details are shown.

    let className = (this.state.details) ? 
      "d-none d-md-block": 
      "";

    return (
      <span className={className}>
        {this.renderType()} {this.props.title}
      </span>
    );
  }

  render() {
    return (
      <a 
        className="list-group-item cursor-pointer list-group-item-action d-flex justify-content-between align-items-center"
        onMouseOver={this.showTooltip}
        onMouseOut={this.hideTooltip}
        onClick={this.toggleDetails}>
        {this.renderTitle()}
        {this.getBadge()}
        {this.renderDetails()}
      </a>
    )
  }
}

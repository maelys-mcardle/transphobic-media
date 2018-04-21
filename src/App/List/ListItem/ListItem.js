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
    let text = 'Unsure'

    if (this.props.data.transphobia === undefined) {
      iconClass = 'fas fa-question-circle';
      className += 'badge-secondary';
      text = 'Unsure';
    } else if (this.props.data.transphobia === null) {
      iconClass = 'fas fa-circle';
      className += 'badge-secondary';
      text = 'Not Applicable';
    } else if (this.props.data.transphobia === true) {
      iconClass = 'fas fa-exclamation-circle';
      className += 'badge-danger';
      text = 'Warning';
    } else if (this.props.data.transphobia === false) {
      iconClass = 'fas fa-smile';
      className += 'badge-primary';
      text = 'No Transphobia';
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

  renderTitle() {
    // Hide title on mobile devices when the details are shown.
    if (this.state.details) {
      return (
        <span className="d-none d-md-block">
          {this.props.title}
        </span>
      )
    } else {
      return this.props.title;
    }
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

import React, { Component } from 'react';
import Details from './Details/Details';
import '../../App.css';

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
          {this.state.tooltip ? ' ' + text + ' ' : ''}
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

  render() {
    return (
      <a 
        href="#test"
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        onMouseOver={this.showTooltip}
        onMouseOut={this.hideTooltip}
        onClick={this.toggleDetails}>
        {this.props.title}
        {this.getBadge()}
        {this.renderDetails()}
      </a>
    )
  }
}

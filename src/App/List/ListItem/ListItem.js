import React, { Component } from 'react';
import Details from './Details/Details';
import Icon from './Icon/Icon';
import './ListItem.css';

export default class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: false
    };

    this.toggleDetails = this.toggleDetails.bind(this);
  }

  renderIcon() {
    if (this.state.details) {
      return '';
    } else {
      return (
        <Icon 
          transphobic={this.props.transphobic}
          showsTransphobia={this.props.showsTransphobia} />
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
        <Details data={this.props.details} imdb={this.props.imdb} />
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
        {this.renderIcon()}
        {this.renderDetails()}
      </a>
    )
  }
}

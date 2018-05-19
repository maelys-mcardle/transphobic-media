import React, { Component } from 'react';

export default class Icon extends Component {
  render() {
    let iconClass = 'fas fa-question-circle';
    let className = 'badge badge-padding ';

    if (this.props.transphobic === true) {
      // transphobic
      iconClass = 'fas fa-frown';
      className += 'badge-danger';
    } else if (this.props.transphobic === false) {
      if (this.props.showsTransphobia === true) {
        // not transphobic
        // shows transphobia
        iconClass = 'fas fa-exclamation-circle';
        className += 'badge-info';
      } else if (this.props.showsTransphobia === false ||
                 this.props.showsTransphobia === null) {
        // not transphobic
        // shows no transphobia / not applicable
        iconClass = 'fas fa-smile';
        className += 'badge-primary';
      } else {
        // unsure
        iconClass = 'fas fa-question-circle';
        className += 'badge-secondary';
      }
    } else if (this.props.transphobic === null) {
      // not applicable
      iconClass = 'fas fa-circle';
      className += 'badge-secondary';
    } else {
      // unsure
      iconClass = 'fas fa-question-circle';
      className += 'badge-secondary';
    }

    return (
        <span className={className}>
            <i className={iconClass}></i>
        </span>
    )
  }
}

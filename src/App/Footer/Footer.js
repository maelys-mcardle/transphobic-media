import React, { Component } from 'react';

export default class Footer extends Component {

  render() {
    return (
      <div className="text-muted">
        <span>
          Have suggestions for titles that should be added
          or corrections to existing 
          ones? <a
            rel="noopener noreferrer" 
            href="https://github.com/maelys-mcardle/transphobic-media/issues"
            target="_blank">
            Submit them here
          </a>.
        </span>
      </div>
    );
  }
}


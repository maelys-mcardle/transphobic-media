import React, { Component } from 'react';
import './Details.css';

export default class Details extends Component {

  renderBadge(value) {
    switch (value) {
      case undefined: return this.badgeUnsure();
      case null: return this.badgeNotApplicable();
      case false: return this.badgeOkay();
      case true: return this.badgeNotOkay();
      default: return this.badgeUnsure();
    }
  }

  badgeUnsure() {
    return (
      <i class="fas fa-question badge-space-right"></i>
    )
  }

  badgeNotApplicable() {
    return (
      <i class="fas fa-minus badge-space-right"></i>
    )
  }

  badgeOkay() {
    return (
      <i class="fas fa-check badge-space-right"></i>
    )
  }

  badgeNotOkay() {
    return (
      <i class="fas fa-times badge-space-right"></i>
    )
  }

  renderTransphobiaText(transphobia) {
    switch (transphobia) {
      case undefined: 
        return 'Unsure if this depicts transphobia or is itself transphobic';
      case null: 
        return 'Not applicable whether this depicts transphobia or is itself transphobic';
      case false: 
        return 'Does not contain any transphobia'
      case true: 
        return 'Depicts transphobia or is itself transphobic'
      default: 
        return 'Unsure if this depicts transphobia or is itself transphobic';
    }
  }

  renderNormalizesText(normalizesTransphobia) {
    switch (normalizesTransphobia) {
      case undefined: 
        return 'Unsure if this normalizes transphobia';
      case null: 
        return 'Not applicable if this normalizes transphobia';
      case false: 
        return 'Does not normalize transphobia';
      case true: 
        return 'Normalizes transphobia';
      default: 
        return 'Unsure if this normalizes transphobia';
    }
  }

  renderTransJokesText(transJokes) {
    switch (transJokes) {
      case undefined: 
        return 'Unsure if this has jokes that disparage trans people';
      case null: 
        return 'Not applicable whether this contains jokes that disparage trans people';
      case false: 
        return 'No jokes that disparage trans people';
      case true: 
        return 'Contains jokes that disparage trans people';
      default: 
        return 'Unsure if this has jokes that disparage trans people';
    }
  }

  renderTransPlayedText(transPlayedByCis) {
    switch (transPlayedByCis) {
      case undefined:
        return 'Unsure if a trans character is portrayed exclusively by a cis actor';
      case null: 
        return 'Contains no trans characters (eg. stand-up comedy, documentary)';
      case false: 
        return 'Trans characters are portrayed by trans actors';
      case true: 
        return 'A trans character is exclusively portrayed by a cis actor';
      default: 
        return 'Unsure if a trans character is portrayed by a cis actor';
    }
  }

  renderDeadTransText(deadTrans) {
    switch (deadTrans) {
      case undefined:
        return 'Unsure if a trans person dies of causes other than old age';
      case null: 
        return 'No trans characters pass away (no trans people featured)';
      case false: 
        return 'No trans characters pass away';
      case true: 
        return 'A trans character dies of causes other than old age';
      default: 
        return 'Unsure if a trans person dies of causes other than old age';
    }
  }

  imdbUrl(imdbCode) {
    return `https://www.imdb.com/title/${imdbCode}/`;
  }

  webSearchUrl(title, transphobia) {
    if (transphobia) {
      return 'https://duckduckgo.com/?q=' + 
        encodeURIComponent(`"${title}" transphobia`);
    } else {
      return 'https://duckduckgo.com/?q=' + 
        encodeURIComponent(title);
    }
  }

  render() {
    return (
      <div className="card">
        <div class="card-header text-muted">
          {this.props.data.title} was released in {this.props.data.year}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {this.renderBadge(this.props.data.transphobia)}
            {this.renderTransphobiaText(this.props.data.transphobia)}
          </li>
          <li className="list-group-item">
            {this.renderBadge(this.props.data.normalizesTransphobia)}
            {this.renderNormalizesText(this.props.data.normalizesTransphobia)}
          </li>
          <li className="list-group-item">
            {this.renderBadge(this.props.data.transJokes)}
            {this.renderTransJokesText(this.props.data.transJokes)}
          </li>
          <li className="list-group-item">
            {this.renderBadge(this.props.data.transPlayedByCis)}
            {this.renderTransPlayedText(this.props.data.transPlayedByCis)}
          </li>
          <li className="list-group-item">
            {this.renderBadge(this.props.data.deadTrans)}
            {this.renderDeadTransText(this.props.data.deadTrans)}
          </li>
        </ul>
        <div class="card-footer">
          <a className="btn btn-primary" 
            href={this.imdbUrl(this.props.imdb)}
            target="_blank">
            IMDB Page
          </a>
          &nbsp;
          <a className="btn btn-primary" 
            href={this.webSearchUrl(this.props.data.title, 
              this.props.data.transphobia)}
            target="_blank">
            Search Web
          </a>
        </div>
      </div>
    )
  }
}
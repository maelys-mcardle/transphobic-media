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

  renderTransphobicText(transphobic) {
    let explanation = `
      (eg. perpetuates tropes, denigrates dating trans/non-binary 
      individuals, uses slurs or misgenders uncritically, casts
      cis actors to play trans/non-binary roles, etc.)`;

    switch (transphobic) {
      case undefined: 
        return 'Unsure if this work is transphobic' + explanation;
      case null: 
        return 'Not applicable if this work is transphobic' + explanation;
      case false: 
        return 'This work is not transphobic' + explanation;
      case true: 
        return 'This work is transphobic' + explanation;
      default: 
        return 'Unsure if this work is transphobic' + explanation;
    }
  }

  renderShowsTransphobiaText(showsTransphobia) {
    switch (showsTransphobia) {
      case undefined: 
        return 'Unsure if any transphobic acts are shown';
      case null: 
        return 'Not applicable whether this contains transphobia';
      case false: 
        return 'Does not contain any transphobia'
      case true: 
        return 'Transphobic acts are shown'
      default: 
        return 'Unsure if any transphobic acts are shown';
    }
  }

  renderTransJokesText(transJokes) {
    switch (transJokes) {
      case undefined: 
        return 'Unsure if this has jokes that disparage trans/non-binary people';
      case null: 
        return 'Not applicable whether this contains jokes that disparage trans/non-binary people';
      case false: 
        return 'No jokes that disparage trans/non-binary people';
      case true: 
        return 'Contains jokes that disparage trans/non-binary people';
      default: 
        return 'Unsure if this has jokes that disparage trans/non-binary people';
    }
  }

  renderTransPlayedText(transPlayedByCis) {
    switch (transPlayedByCis) {
      case undefined:
        return 'Unsure if a trans/non-binary character is portrayed exclusively by a cis actor';
      case null: 
        return 'Contains no trans/non-binary characters (eg. stand-up comedy, documentary)';
      case false: 
        return 'Trans/non-binary characters are portrayed by trans actors';
      case true: 
        return 'A trans/non-binary character is exclusively portrayed by a cis actor';
      default: 
        return 'Unsure if a trans/non-binary character is portrayed by a cis actor';
    }
  }

  renderDeadTransText(deadTrans) {
    switch (deadTrans) {
      case undefined:
        return 'Unsure if a trans/non-binary person dies of causes other than old age';
      case null: 
        return 'No trans/non-binary characters pass away (no trans people featured)';
      case false: 
        return 'No trans/non-binary characters pass away';
      case true: 
        return 'A trans/non-binary character dies of causes other than old age';
      default: 
        return 'Unsure if a trans/non-binary person dies of causes other than old age';
    }
  }

  imdbUrl(imdbCode) {
    return `https://www.imdb.com/title/${imdbCode}/`;
  }

  webSearchUrl(title, transphobia) {
    let urlBase = 'https://google.com/search?q=';
    if (transphobia) {
      return urlBase + encodeURIComponent(`"${title}" transphobia`);
    } else {
      return urlBase + encodeURIComponent(title);
    }
  }

  renderTitle(title, startYear, endYear) {
    if (endYear) {
      return(<span>"{title}" ran from {startYear} - {endYear}</span>);
    } else {
      return(<span>"{title}" was released in {startYear}</span>);
    }
  }

  render() {
    return (
      <div className="card card-details">
        <div class="card-header text-muted">
          {this.renderTitle(this.props.data.title, 
            this.props.data.year,
            this.props.data.endYear)}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {this.renderBadge(this.props.data.transphobic)}
            {this.renderTransphobicText(this.props.data.transphobic)}
          </li>
          <li className="list-group-item">
            {this.renderBadge(this.props.data.showsTransphobia)}
            {this.renderShowsTransphobiaText(this.props.data.showsTransphobia)}
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
              this.props.data.normalizesTransphobia)}
            target="_blank">
            Search Web
          </a>
        </div>
      </div>
    )
  }
}
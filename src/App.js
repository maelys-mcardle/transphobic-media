import React, { Component } from 'react';
import allTransphobiaDbEntries from './transphobic';
import './App.css';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-top">
        <span className="navbar-brand">
          <i className="fas fa-comments"></i>
          &nbsp;
          <strong><em>Is it Transphobic?</em></strong>
        </span>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" 
            type="search" 
            placeholder="Search"
            aria-label="Search" 
            onChange={evt => this.props.searchFunction(evt.target.value)}/>
        </form>
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
        imdb={imdb}
        data={this.props.entries[imdb]} />
    );
  }

  render() {
    return (
      <ul className="list-group">
        {this.getListItems()}
      </ul>
    );
  }
}

class ListItem extends Component {

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

class Details extends Component {

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
      <i class="fas fa-question"></i>
    )
  }

  badgeNotApplicable() {
    return (
      <i class="fas fa-minus"></i>
    )
  }

  badgeOkay() {
    return (
      <i class="fas fa-check"></i>
    )
  }

  badgeNotOkay() {
    return (
      <i class="fas fa-times"></i>
    )
  }

  renderTransphobiaText(transphobia) {
    switch (transphobia) {
      case undefined: 
        return 'Unsure if this depicts transphobia or is transphobic';
      case null: 
        return 'Not applicable whether this depicts transphobia or is transphobic';
      case false: 
        return 'Does not contain any transphobia'
      case true: 
        return 'Depicts transphobia or is transphobic'
      default: 
        return 'Unsure if this depicts transphobia or is transphobic';
    }
  }

  renderNormalizesText(normalizesTransphobia) {
    switch (normalizesTransphobia) {
      case undefined: 
        return 'Unsure if this normalizes transphobia';
      case null: 
        return 'Not applicable if this normalizes transphobia';
      case false: 
        return 'This normalizes transphobia';
      case true: 
        return 'This does not normalize transphobia';
      default: 
        return 'Unsure if this normalizes transphobia';
    }
  }

  renderTransJokesText(transJokes) {
    switch (transJokes) {
      case undefined: 
        return 'Unsure if this contains jokes that disparage trans people';
      case null: 
        return 'Not applicable if this contains jokes that disparage trans people';
      case false: 
        return 'This does not contain jokes that disparage trans people';
      case true: 
        return 'This contains jokes that disparage trans people';
      default: 
        return 'Unsure if this contains jokes that disparage trans people';
    }
  }

  renderTransPlayedText(transPlayedByCis) {
    switch (transPlayedByCis) {
      case undefined:
        return 'Unsure if a trans character is portrayed exclusively by a cis actor';
      case null: 
        return 'No fictitious trans characters to be portrayed';
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
        return 'Unsure if a trans person dies';
      case null: 
        return 'No trans people featured';
      case false: 
        return 'No trans characters die';
      case true: 
        return 'A trans character dies of causes other than old age';
      default: 
        return 'Unsure if a trans person dies';
    }
  }

  imdbUrl(imdbCode) {
    return 'https://www.imdb.com/title/' + imdbCode + '/';
  }

  webSearchUrl(title, transphobia) {
    if (transphobia) {
      return 'https://duckduckgo.com/?q=' + 
        encodeURIComponent(title + ' transphobia');
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
            &nbsp;
            {this.renderTransphobiaText(this.props.data.transphobia)}
          </li>
          <li className="list-group-item">
            {this.renderBadge(this.props.data.normalizesTransphobia)}
            &nbsp;
            {this.renderNormalizesText(this.props.data.normalizesTransphobia)}
          </li>
          <li className="list-group-item">
            {this.renderBadge(this.props.data.transJokes)}
            &nbsp;
            {this.renderTransJokesText(this.props.data.transJokes)}
          </li>
          <li className="list-group-item">
            {this.renderBadge(this.props.data.transPlayedByCis)}
            &nbsp;
            {this.renderTransPlayedText(this.props.data.transPlayedByCis)}
          </li>
          <li className="list-group-item">
            {this.renderBadge(this.props.data.deadTrans)}
            &nbsp;
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
            Search Web for Title
          </a>
        </div>
      </div>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entriesToShow: allTransphobiaDbEntries,
      searchTerm: ''
    }
    this.searchDbEntries = this.searchDbEntries.bind(this);
  }

  searchDbEntries(searchTerm) {

    let searchResults = allTransphobiaDbEntries;
    if (searchTerm) {
      let imdbKeysForSearchResults = Object.keys(
        allTransphobiaDbEntries).filter(
          imdb => allTransphobiaDbEntries[imdb].title.toLowerCase().includes(
            searchTerm.toLowerCase()));

      searchResults = imdbKeysForSearchResults.map( 
        imdb => allTransphobiaDbEntries[imdb]);
    }

    this.setState({
      searchTerm: searchTerm,
      entriesToShow: searchResults
    })
  }

  renderTitle() {
    if (this.state.searchTerm) {
      return 'Searching for "' + this.state.searchTerm + '"';
    } else {
      return 'All Titles'
    }
  }

  render() {
    return (
      <div className="container">
        <NavBar searchFunction={this.searchDbEntries} />
        <h2>{this.renderTitle()}</h2>
        <List entries={this.state.entriesToShow} />
        <div className="text-muted">
          Do you have suggestions for titles that should be added
          or corrections to existing ones?
          &#8239;
          <a
            rel="noopener noreferrer" 
            href="https://github.com/maelys-mcardle/transphobic-media/issues"
            target="_blank">
            Submit them here
          </a>.
        </div>
      </div>
    );
  }
}

export default App;

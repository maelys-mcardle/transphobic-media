import React, { Component } from 'react';
import allTransphobiaDbEntries from '../transphobic';
import NavBar from './NavBar/NavBar';
import List from './List/List';
import Footer from './Footer/Footer';
import Title from './Title/Title';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entriesToShow: allTransphobiaDbEntries,
      searchTerm: ''
    }
    this.searchDbEntries = this.searchDbEntries.bind(this);
    this.resetState = this.resetState.bind(this);
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

  resetState() {
    this.setState({
      searchTerm: '',
      entriesToShow: allTransphobiaDbEntries
    })
  }

  render() {
    return (
      <div className="container">
        <NavBar 
          searchFunction={this.searchDbEntries}
          homepageFunction={this.resetState}
          searchTerm={this.state.searchTerm} />
        <Title 
          searchTerm={this.state.searchTerm}
          entryCount={Object.keys(this.state.entriesToShow).length} />
        <List entries={this.state.entriesToShow} />
        <Footer />
      </div>
    );
  }
}

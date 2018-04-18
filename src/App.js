import React, { Component } from 'react';
import allTransphobiaDbEntries from './transphobic';
import NavBar from './NavBar/NavBar';
import List from './List/List';
import Footer from './Footer/Footer';
import './App.css';

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
        <Footer />
      </div>
    );
  }
}

export default App;

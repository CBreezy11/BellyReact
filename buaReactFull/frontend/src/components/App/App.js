import React from 'react';
import './App.css';
import logo from './BUA_FULL_B_LOGO.gif'
import SearchBar from '../SearchBar/SearchBar';
import ResultList from '../BusinessList/ResultList';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      sortby: ''
    }
    this.searchDB = this.searchDB.bind(this)
  }
  async searchDB(searchObject) {
    this.setState({ sortby: searchObject.sortBy })
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        searchTerm: searchObject.searchTerm,
        sortBy: searchObject.sortBy
      })
    }
    const proxyURL = 'https://thingproxy.freeboard.io/fetch/',
      targetURL = 'https://28d0s60ihe.execute-api.us-west-2.amazonaws.com/dev'
    await fetch(proxyURL + targetURL, requestOptions)
      .then(response => {
        console.log('Response: ', response)
        return response.json()
      }).then(jsonResponse => {
        this.setState({ results: jsonResponse })
      })


  }

  render() {
    return (
      <div className="App" >
        <h1>
          <img src={logo} className="App-logo" alt="logo" />
        </h1>
        <p style={{ color: "#c9b92f" }}>Very ugly but works.  For Show Data: enter any part of the billing, preferably the date in mm/dd/yy format to get
          the exact show.  If you don't know the date type in a search word of the bill and then you can see all the shows and get the date and
          type in the date from there.  For Customer Lookup: not currently working, turned off those resources in AWS.  Work in progress, styling is horrific yes
          I know, very new to css language.
        </p>
        <SearchBar searchDB={this.searchDB} />
        <ResultList results={this.state} />
      </div>
    )
  }
}
export default App;

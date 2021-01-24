import React, { Component } from "react";
import axios from 'axios';
import './Search.css';
class Search extends Component {
    state = {
        searchValue: '',
        location: 'USA',
        items : [],
        curr : []
    };
    handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
    };
    handleLocation = event => {
      this.setState({ location: event.target.value });
    };
    handleSearch = () => {
        this.makeApiCall(this.state.searchValue, this.state.location);
    }
    makeApiCall = async (searchInput, location)  => {
        const BEARER_TOKEN = '2oXsdHbjPVgyM7xmdOXjt3gBquPiu9ZqWG6ww-gAd5SGKUrJ4gscvvO4yy5tKF9PMtOrw0g6XIQKb8t9IftBw-VMEWxNPReLG0P6jVAsSN8xbre5W13g3tic5Kr8X3Yx';
        const data = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
            params: {
              term: searchInput,
              location: location,
            },
          },
        )

        .then(json => {
            this.setState({ items: json.data.businesses });
        })
        .then(resty => {
          this.setState({ curr: this.state.items[Math.floor(Math.random() * this.state.items.length)]})
        })
        .catch(err => {
            console.log(err);
        });
    };

    

    render() {
        return (
            <div>
            <h1>Welcome to the Restaurant Roulette</h1>
            <input
            name="text"
            type="text"
            placeholder="Whatchu Want"
            onChange={event => this.handleOnChange(event)}
            value={this.state.searchValue}
            />
            <input
            name="text"
            type="text"
            placeholder="Location"
            onChange={event => this.handleLocation(event)}
            value={this.state.location}
            />
            <button onClick={this.handleSearch}>Roll!</button>
            {console.log(this.state.curr)}
            {this.state.items ? (
            <div>
              <h1>{this.state.curr.name}</h1>
              <img src={this.state.curr.image_url}/>
            </div>
            ) : (
            <p>Try searching for a meal</p>
            )}
            </div>
            );
    }
}
export default Search;

import React, { Component } from "react";
import axios from 'axios';
import './Search.css';
class Search extends Component {
    state = {
        searchValue: '',
        meals: []
    };
    handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
    };
    handleSearch = () => {
        this.makeApiCall(this.state.searchValue);
    }
    makeApiCall = async searchInput => {
        const BEARER_TOKEN = '2oXsdHbjPVgyM7xmdOXjt3gBquPiu9ZqWG6ww-gAd5SGKUrJ4gscvvO4yy5tKF9PMtOrw0g6XIQKb8t9IftBw-VMEWxNPReLG0P6jVAsSN8xbre5W13g3tic5Kr8X3Yx';
        const data = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=usa`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
            params: {
              term: searchInput,
            },
          },
        )
      
        .then(json => {
            console.log(json.data.businesses)
            this.setState({ items: json.data.businesses });
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
            <button onClick={this.handleSearch}>Roll!</button>
            {this.state.items ? (
            <div>
            {this.state.items.map((businesses, index) => (
            <div key={index}>
            <h1>{businesses.name}</h1>
            <img src={businesses.image_url} alt="meal-thumbnail" />
            </div>
            ))}
            </div>
            ) : (
            <p>Try searching for a meal</p>
            )}
            </div>
            );
    }
}
export default Search;
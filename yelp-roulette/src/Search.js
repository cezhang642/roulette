import React, { Component } from "react";
import axios from 'axios';
import './Search.css';
class Search extends Component {
    state = {
        searchValue: '',
        items : [],
        curr : []
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
      const k = Math.floor(Math.random() *(this.state.items).length)
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
            {console.log(this.state.curr)}
            {this.state.items ? (
            //   <div>
            //   {
            //   <h1>{((this.state.items)[k]).name}</h1>
            //   // <img src={this.state.items[k].image_url} alt="meal-thumbnail" />
            //   // </div>
            //   // ))}
            // }
            //   </div>
            <div>
              <h1>{this.state.curr.name}</h1>
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

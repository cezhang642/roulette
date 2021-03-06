'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = '2oXsdHbjPVgyM7xmdOXjt3gBquPiu9ZqWG6ww-gAd5SGKUrJ4gscvvO4yy5tKF9PMtOrw0g6XIQKb8t9IftBw-VMEWxNPReLG0P6jVAsSN8xbre5W13g3tic5Kr8X3Yx';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});
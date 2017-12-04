const API = 'http://localhost:3001';

//Generate an unique token for storing your data on the server
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

//Define headers configuration to be used when fetching data
const HEADERS = {
  Accept: 'application/json',
  Authorization: token,
  'Content-Type': 'application/json',
};

//
// API Calls
//

/**
 * getAllCategories
 * @return {Array} category array
 */
const getAllCategories = () =>
  fetch(`${API}/categories`, { headers: HEADERS })
    .then(results => results.json())
    .then(data => data.categories);

export default {
  getAllCategories,
};

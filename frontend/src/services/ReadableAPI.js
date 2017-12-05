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
const getAllCategories = () => {
  return fetch(`${API}/categories`, { headers: HEADERS })
    .then(results => results.json())
    .then(data => data.categories);
};

/**
 * getAllPosts
 * @return {Array} posts array
 */
const getAllPosts = () => {
  return fetch(`${API}/posts`, { headers: HEADERS })
    .then(results => results.json())
    .then(data => data);
};

//
// Export Methods
//
export default {
  getAllCategories,
  getAllPosts,
};

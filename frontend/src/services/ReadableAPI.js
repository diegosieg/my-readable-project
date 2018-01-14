import { v4 } from 'uuid';

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

/**
 * getPostContent
 * @param {String} postId
 * @return {Array} post array
 */
const getPostContent = postId => {
  return fetch(`${API}/posts/${postId}`, { headers: HEADERS })
    .then(results => results.json())
    .then(data => data);
};

/**
 * getCommentsByPost
 * @param {String} postId
 * @return {Array} posts array
 */
const getCommentsByPost = postId => {
  return fetch(`${API}/posts/${postId}/comments`, { headers: HEADERS })
    .then(results => results.json())
    .then(data => data);
};

/**
 * createPost
 * @param {Obj} postData
 */
const createPost = postData => {
  console.log('teste api');
  return fetch(`${API}/posts`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      ...postData,
      id: v4(),
      timestamp: Date.now(),
    }),
  }).then(results => results.json());
};

/**
 * updatePost
 * @param {Obj} postData {title, body, category, author}
 */
const updatePost = (id, postData) => {
  const editedPost = { ...postData, timestamp: Date.now() };
  console.log(editedPost);
  return fetch(`${API}/posts/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(editedPost),
  }).then(results => results.json());
};

/**
 * removePost
 * @param {string} postId
 */
const removePost = postId =>
  fetch(`${API}/posts/${postId}`, {
    method: 'DELETE',
    headers: HEADERS,
  })
    .then(results => results.json())
    .then(data => data);

//
// Export Methods
//
export default {
  getAllCategories,
  getAllPosts,
  getPostContent,
  getCommentsByPost,
  createPost,
  updatePost,
  removePost,
};

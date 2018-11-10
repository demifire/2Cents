import axios from 'axios';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_ALL_APPROVED_COMMENTS = 'GET_ALL_APPROVED_COMMENTS' //get all approved comments by id for a particular post
export const GET_PENDING_COMMENTS = 'GET_PENDING_COMMENTS' // get all pending comments needing approval for a post.

export const getAllPosts = () => {
  return dispatch => {
    axios
      .get('/posts')
      .then(response => {
        console.log("POSTS!!!", response);
        dispatch({
          type: GET_ALL_POSTS,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}
import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter';

const API_URL = '/api/users'

// Create user
const createUser = async (userData, token) => {
  console.log(userData) //
  
  // setting up case converter options
  const options = {
    ignoreHeaders: true
  };
  const client = applyCaseMiddleware(axios.create(), options);

  // setting up the bearer token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await client.post(API_URL, userData, config)
  
  console.log(response.data) //
  return response.data
}

// Get users
const getUsers = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user
const deleteUser = async (userId, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.delete(API_URL + '/' + userId, config)

  return response.data
}

const userService = {
    createUser,
    getUsers,
    deleteUser
}

export default userService

import axios from 'axios'

const API_URL = '/api/users'

// Login user
const login = async (userData) => {
  // console.log(userData)

  // first get the csrf token
  const csrfToken = await axios.get("/sanctum/csrf-cookie")
  // console.log(csrfToken)
  
  // then call login and get sanctum token back
  const response = await axios.post(API_URL + '/login', userData)
  console.log(response.data)

  if(response.data) {
      localStorage.setItem('auth', JSON.stringify(response.data))
  }
  return response.data
}

// Logout
const logout = async (token) => {
  // first remove the token locally
  localStorage.removeItem('auth')

  // now remove it from the server
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.post(API_URL + '/logout', '_', config)  // position of arguments are important
  return response.data
}

const authService = {
    login,
    logout
}

export default authService

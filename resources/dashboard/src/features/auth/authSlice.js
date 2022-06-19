import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get auth from local storage
const auth = JSON.parse(localStorage.getItem('auth'))

const initialState = {
  auth: auth ? auth : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// User login
export const login = createAsyncThunk('auth/login', async (authCreds, thunkAPI) => {
  try {
      return await authService.login(authCreds)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// User logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.auth.token
      return await authService.logout(token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// the Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.auth = action.payload
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.auth = null
    })

    .addCase(logout.fulfilled, (state) => {
      state.auth = null
    })
  }
})

export const {reset} = authSlice.actions
export default authSlice.reducer

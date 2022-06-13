import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

// Get user from local storage
// const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  // user: user ? user : null,
  // user: null,
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// Create user
export const createUser = createAsyncThunk('users/create', async (userData, thunkAPI) => {
  try {
      return await userService.register(userData)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// // Get users
// export const getUsers = createAsyncThunk('users/getAll', async (_, thunkAPI) => {
//   try {
//       // const token = thunkAPI.getState().auth.user.token
//       // return await userService.getUsers(token)
//   } catch (error) {
//       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//       return thunkAPI.rejectWithValue(message)
//   }
// })

// // Delete user
// export const deleteUser = createAsyncThunk('users/delete', async (id, thunkAPI) => {
//   try {
//       // const token = thunkAPI.getState().auth.user.token
//       // return await userService.deleteUser(id, token)
//   } catch (error) {
//       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//       return thunkAPI.rejectWithValue(message)
//   }
// })

// the Actual slice function
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      reset: (state) => {  // cannot use reset: (state) => initialState if solo user comes after auth applied
          // state.user = null
          state.users = []
          state.isLoading = false
          state.isSuccess = false
          state.isError = false
          state.message = ''
      }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUser.pending, (state) => {
        state.isLoading = true
    })
    .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users.push(action.payload)
    })
    .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    // .addCase(getUsers.pending, (state) => {
    //     state.isLoading = true
    // })
    // .addCase(getUsers.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.goals = action.payload
    // })
    // .addCase(getUsers.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    // })
    // .addCase(deleteUser.pending, (state) => {
    //     state.isLoading = true
    // })
    // .addCase(deleteUser.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
    // })
    // .addCase(deleteUser.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    // })
  }
})

export const {reset} = userSlice.actions
export default userSlice.reducer

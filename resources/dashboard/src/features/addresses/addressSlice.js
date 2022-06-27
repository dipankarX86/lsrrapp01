import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import addressService from './addressService'

const initialState = {
  csc: null,  // make it one, in the backend, will fetch them as one api call
  cscApiCallCount: 0,
  // lastFetched:'',  // will fetch again if older then say 1hr
  // isLoadingCsc: false,
  // isSuccessCsc: false,
  // isErrorCsc: false,
  // messageCsc: ''
}

// Get Cities, States and Countries: Get all 3 of them at one go
export const getCsc = createAsyncThunk('csc/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await addressService.getCsc(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// the Actual slice function
export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    // reset: (state) => initialState,
    // reset: (state) => {
    //   state.isLoadingCsc = false
    //   state.isSuccessCsc = false
    //   state.isErrorCsc = false
    //   state.messageCsc = ''
    // },
    gotCsc: (state) => {
      state.cscApiCallCount++
    }
  },
  extraReducers: (builder) => {
    builder
    // .addCase(getCsc.pending, (state) => {
    //     state.isLoadingCsc = true
    // })
    .addCase(getCsc.fulfilled, (state, action) => {
        // state.isLoadingCsc = false
        // state.isSuccessCsc = true
        state.csc = action.payload
    })
    // .addCase(getCsc.rejected, (state, action) => {
    //     state.isLoadingCsc = false
    //     state.isErrorCsc = true
    //     state.messageCsc = action.payload
    // })
  }
})

export const {reset, gotCsc} = addressSlice.actions
export default addressSlice.reducer

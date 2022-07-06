import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import shopService from './shopService'

const initialState = {
  initialRefreshIsDone: false,

  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  
  shops: {},
  shopsApiCallCount: 0,

  shop: null,
  shopApiCallCount: 0,
}

// Create shop
export const createShop = createAsyncThunk('shops/create', async (shopData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.createShop(shopData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get shops
/* export const getShops = createAsyncThunk('shops/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.getShops(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}) */
// Get PAGED Shops
export const getPagedShops = createAsyncThunk('shops/getPaged', async (loadParams, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.getPagedShops(token, loadParams)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get Shop
export const getShop = createAsyncThunk('shops/getOne', async (shopId, thunkAPI) => {
  console.log(shopId)
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.getShop(token, shopId)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// Edit shop
export const editShop = createAsyncThunk('shops/edit', async (shopData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.editShop(shopData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// Delete shop
export const deleteShop = createAsyncThunk('shops/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.deleteShop(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// the Actual slice function
export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    reset: (state) => initialState,
    // resetShops: (state) => {
    //   state.isLoading = false
    //   state.isSuccess = false
    //   state.isError = false
    //   state.message = ''
    // },
    setInitialRefreshIsDone: (state) => {
      state.initialRefreshIsDone = true
    },
    unsetInitialRefreshIsDone: (state) => {
      state.initialRefreshIsDone = false
    },
    gotShops: (state) => {
      state.shopsApiCallCount++
    },
    gotShop: (state) => {
      state.shopApiCallCount++
    },
    // resetExceptShop: (state) => {
    //   state.shops = []
    //   state.shopsApiCallCount = 0
    //   state.isLoading = false
    //   state.isSuccess = false
    //   state.isError = false
    //   state.message = ''
    // }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createShop.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createShop.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      // state.shops.push(action.payload)
    })
    .addCase(createShop.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })

    /* .addCase(getShops.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getShops.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shops = action.payload
    })
    .addCase(getShops.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    }) */
    .addCase(getPagedShops.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getPagedShops.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shops = action.payload
    })
    .addCase(getPagedShops.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })

    .addCase(getShop.fulfilled, (state, action) => {
        state.shop = action.payload
    })

    
    .addCase(editShop.pending, (state) => {
      state.isLoading = true
    })
    .addCase(editShop.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      // state.shops.push(action.payload)
    })
    .addCase(editShop.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })


    .addCase(deleteShop.pending, (state) => {
        state.isLoading = true
    })
    .addCase(deleteShop.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shops = state.shops.filter((shop) => shop._id !== action.payload.id)
    })
    .addCase(deleteShop.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
  }
})

export const {reset, setInitialRefreshIsDone, unsetInitialRefreshIsDone, gotShops, gotShop} = shopSlice.actions  // resetShops, resetExceptShop
export default shopSlice.reducer

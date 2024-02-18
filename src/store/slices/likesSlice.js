import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  like: null,
}

const likesSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers() {},
})

export default likesSlice.reducer

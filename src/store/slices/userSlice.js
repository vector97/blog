import { setExistingUser, setNewUser, updateUser } from '../thunks/authThunk'

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  userLoading: false,
  userError: null,
  updated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser(state, action) {
      state.user = action.payload.user
    },
    logOut(state) {
      state.user = null
    },
  },

  extraReducers(builder) {
    builder
      .addCase(setNewUser.pending, (state) => {
        state.userLoading = 'loading'
      })
      .addCase(setNewUser.fulfilled, (state, action) => {
        state.userLoading = 'succeeded'
        state.user = action.payload.user
        state.userError = null
      })
      .addCase(setNewUser.rejected, (state, action) => {
        state.userLoading = 'failed'
        state.userError = action.payload.errors
      })
      .addCase(setExistingUser.pending, (state) => {
        state.userLoading = 'loading'
      })
      .addCase(setExistingUser.fulfilled, (state, action) => {
        state.userLoading = 'succeeded'
        state.user = action.payload.user
        state.userError = null
      })
      .addCase(setExistingUser.rejected, (state, action) => {
        state.userLoading = 'failed'
        state.userError = action.payload.errors
      })
      .addCase(updateUser.pending, (state) => {
        state.userLoading = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userLoading = 'succeeded'
        state.user = { ...state.user, ...action.payload.user }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userLoading = 'rejected'
        state.userError = action.payload.errors
      })
  },
})

export const { setUser, logOut } = userSlice.actions

export default userSlice.reducer

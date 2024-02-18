import { logIn, signUp, upDate } from '../../api/userApi'

import { createAsyncThunk } from '@reduxjs/toolkit'

export const setNewUser = createAsyncThunk('user/setNewUser', async (data, { rejectWithValue }) => {
  try {
    const user = await signUp(data.newUser)
    localStorage.setItem('user', JSON.stringify(user))
    data.cb()

    return user
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const setExistingUser = createAsyncThunk('user/setExistingUser', async (data, { rejectWithValue }) => {
  try {
    const user = await logIn(data.existingUser)
    localStorage.setItem('user', JSON.stringify(user))
    data.cb()

    return user
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (data, { rejectWithValue }) => {
  try {
    const updatedUser = await upDate(data)
    localStorage.setItem('user', JSON.stringify(updatedUser))

    return updatedUser
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

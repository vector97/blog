import articlesReducer from './slices/articlesSlice'
import likesReducer from './slices/likesSlice'
import userReducer from './slices/userSlice'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
    likes: likesReducer,
  },
})

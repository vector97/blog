import { createNewArticle, deleteArticle, fetchArticles, fetchOneArticle, updateArticle } from '../thunks/articlesThunk'
import { addLike, deleteLike } from '../thunks/likesThunk'

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  oneArticle: null,
  totalArticles: 0,
  currentPage: 1,
  status: 'idle',
  error: false,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
        state.error = false
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.articles = action.payload.articles
        state.totalArticles = action.payload.articlesCount
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.status = 'rejected'
        state.error = true
      })
      .addCase(fetchOneArticle.pending, (state) => {
        state.status = 'loading'
        state.error = false
      })
      .addCase(fetchOneArticle.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.oneArticle = action.payload.article
      })
      .addCase(fetchOneArticle.rejected, (state) => {
        state.status = 'rejected'
        state.error = true
      })
      .addCase(createNewArticle.pending, (state) => {
        state.status = 'pending'
        state.error = false
      })
      .addCase(createNewArticle.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.articles = [action.payload.article, ...state.articles]
      })
      .addCase(createNewArticle.rejected, (state) => {
        state.status = 'rejected'
        state.error = true
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.oneArticle = null
      })
      .addCase(updateArticle.pending, (state) => {
        state.status = 'pending'
        state.error = false
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.articles = ['edit', action.payload.article, ...state.articles]
      })
      .addCase(updateArticle.rejected, (state) => {
        state.status = 'rejected'
        state.error = true
      })
      .addCase(addLike.fulfilled, (state, action) => {
        const { article } = action.payload
        const index = state.articles.findIndex((item) => item.slug === article.slug)
        state.articles[index] = article
        state.oneArticle = article
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        const { article } = action.payload
        const index = state.articles.findIndex((item) => item.slug === article.slug)
        state.articles[index] = article
        state.oneArticle = article
      })
  },
})

export const { setCurrentPage } = articlesSlice.actions

export default articlesSlice.reducer

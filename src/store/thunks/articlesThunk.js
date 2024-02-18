import { createArticle, delArticle, editArticle, getArticles, getOneArticle } from '../../api/articlesApi'

import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', ({ offset, token }) =>
  getArticles(offset, token)
)

export const fetchOneArticle = createAsyncThunk('articles/fetchOneArticle', ({ slug, token }) =>
  getOneArticle(slug, token)
)

export const createNewArticle = createAsyncThunk('articles/createNewArticle', async (data) => {
  const newArticle = await createArticle(data.newArticle, data.token)
  data.cb()
  return newArticle
})

export const deleteArticle = createAsyncThunk('articles/deleteArticle', (data) => delArticle(data.slug, data.token))

export const updateArticle = createAsyncThunk('articles/updateArticle', async (data) => {
  const updatedArticle = await editArticle(data.slug, data.editedArticle, data.token)
  data.cb()
  return updatedArticle
})

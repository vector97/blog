import axios from 'axios'

const baseURL = 'https://blog.kata.academy/api'

export const getArticles = async (offset, token) => {
  const response = await axios.get(`${baseURL}/articles?limit=20&offset=${offset}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getOneArticle = async (slug, token) => {
  const response = await axios.get(`${baseURL}/articles/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const createArticle = async (newArticle, token) => {
  const response = await axios.post(`${baseURL}/articles`, newArticle, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const delArticle = async (slug, token) => {
  const response = await axios.delete(`${baseURL}/articles/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const editArticle = async (slug, editedArticle, token) => {
  const response = await axios.put(`${baseURL}/articles/${slug}`, editedArticle, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

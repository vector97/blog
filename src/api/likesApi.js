import axios from 'axios'

const baseURL = 'https://blog.kata.academy/api'

export const addLike = async (slug, token) => {
  const response = await axios.post(
    `${baseURL}/articles/${slug}/favorite`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const deleteLike = async (slug, token) => {
  const response = await axios.delete(`${baseURL}/articles/${slug}/favorite`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

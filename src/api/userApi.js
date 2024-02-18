import axios from 'axios'

const baseURL = 'https://blog.kata.academy/api'

export const signUp = async (data) => {
  const response = await axios.post(`${baseURL}/users`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

export const logIn = async (data) => {
  const response = await axios.post(`${baseURL}/users/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}

export const upDate = async (data) => {
  const response = await axios.put(`${baseURL}/user`, data.updatedUser, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
  })

  return response.data
}

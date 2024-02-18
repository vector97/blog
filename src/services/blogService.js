const baseURL = 'https://blog.kata.academy/api'

export const fetchArticles = async (page) => {
  try {
    const response = await fetch(`${baseURL}/articles?offset=${(page - 1) * 20}`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error.message)
  }
}

export const fetchArticle = async (slug) => {
  try {
    const response = await fetch(`${baseURL}/articles/${slug}`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error.message)
  }
}

import { fetchArticles } from '../services/blogService'

import { defer } from 'react-router-dom'

const useArticles = (page) => {
  const { articles, articlesCount } = fetchArticles(page)

  return {
    articles,
    pageQty: articlesCount / 20,
  }
}

const getArticles = async (page) => fetchArticles(page)

const blogLoader = async (page) =>
  defer({
    articles: getArticles(page),
  })

export { blogLoader, useArticles }

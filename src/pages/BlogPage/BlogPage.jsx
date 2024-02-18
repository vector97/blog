import s from './BlogPage.module.scss'

import Article from '../../components/Article'
import { fetchArticles } from '../../services/blogService'

import { Pagination, PaginationItem, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function BlogPage() {
  const location = useLocation()
  const [page, setPage] = useState(parseInt(location.search?.split('=')[1] || 1, 10))
  const [articles, setArticles] = useState(null)
  const [pageQty, setPageQty] = useState(0)

  useEffect(() => {
    fetchArticles(page).then((data) => {
      setArticles(data.articles)
      setPageQty(Math.floor(data.articlesCount / 20))
    })
  }, [page])

  return (
    <div className={s.container}>
      {!articles && <h2>Loading...</h2>}
      {articles && articles.map((article) => <Article key={article.slug} article={article} />)}
      <Stack>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{ marginX: 'auto' }}
            renderItem={(item) => <PaginationItem component={Link} to={`/?page=${item.page}`} {...item} />}
          />
        )}
      </Stack>
    </div>
  )
}

export { BlogPage }

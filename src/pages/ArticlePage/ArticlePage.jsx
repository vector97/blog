import s from './ArticlePage.module.scss'

import Article from '../../components/Article'
import { fetchArticle } from '../../services/blogService'

import { Suspense } from 'react'
import { Await, defer, useLoaderData, useParams } from 'react-router-dom'

function ArticlePage() {
  const { article } = useLoaderData()
  const { slug } = useParams()

  return (
    <div className={s.container}>
      <Suspense fallback={<h2>Article is loading...</h2>}>
        <Await resolve={article}>{(resolvedArticle) => <Article article={resolvedArticle} slug={slug} />}</Await>
      </Suspense>
    </div>
  )
}

const getArticle = (slug) => fetchArticle(slug).then((data) => data.article)

const articleLoader = ({ params }) => {
  const { slug } = params

  return defer({ article: getArticle(slug), slug })
}

export { ArticlePage, articleLoader }

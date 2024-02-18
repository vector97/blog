import s from './Article.module.scss'

import { format } from 'date-fns'
import { Link } from 'react-router-dom'

function Article({ article, slug }) {
  const isSingle = !!slug

  return (
    <article className={s.article}>
      <header className={s.header}>
        <h2 className={s.title}>
          {isSingle ? article.title : <Link to={`/articles/${article.slug}`}>{article.title}</Link>}
        </h2>

        <button className={s.like} type="button">
          {article.favoritesCount}
        </button>
      </header>

      <ul className={s.tags}>
        {article.tagList.map((tag) => (
          <li key={tag} className={s.tag}>
            {tag}
          </li>
        ))}
      </ul>

      <p className={s.description}>{article.description}</p>

      {isSingle && <p className={s.text}>{article.body}</p>}

      <div className={s.author}>
        <h3 className={s.name}>{article.author.username}</h3>
        <p className={s.date}>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</p>
        <img className={s.avatar} src={article.author.image} alt={article.author.username} />
      </div>
    </article>
  )
}

export default Article

import styles from './ArticleCard.module.scss'

import userAvatar from '../../assets/avatar.svg'
import heart from '../../assets/heart.svg'
import like from '../../assets/like.svg'
import { addIdForTags } from '../../helpers/addIdForTags'
import { handleAddLike } from '../../helpers/addLike'
import { formatCreatedDate } from '../../helpers/formatDate'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function ArticleCard({ article }) {
  const dispatch = useDispatch()
  const createdAt = formatCreatedDate(article.createdAt)
  const tagWithId = addIdForTags(article.tagList)
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  return (
    <Link to={`/articles/${article.slug}`}>
      <div className={styles.article}>
        <div className={styles.article__info}>
          <div className={styles.article__titleWraper}>
            <h5 className={styles.article__title}>{article.title}</h5>

            <span className={styles.article__likesCount}>
              <button type="button" onClick={(e) => handleAddLike(e, user, dispatch, article, navigate)}>
                {article.favorited ? <img src={like} alt="I like it" /> : <img src={heart} alt="I like it" />}
              </button>
              {article.favoritesCount}
            </span>
          </div>
          <div className={styles.article__tags}>
            {tagWithId.map((tag) => (
              <span key={tag.id} className={styles.article__tag}>
                {tag.tag}
              </span>
            ))}
          </div>
          <p className={styles.article__description}>{article.description}</p>
        </div>

        <div className={styles.article__user}>
          <div>
            <h6 className={styles.article__userName}>{article.author.username}</h6>
            <span className={styles.article__date}>{createdAt}</span>
          </div>
          <div className={styles.article__avatar}>
            <img src={article.author.image ? article.author.image : userAvatar} alt="user avatar" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard

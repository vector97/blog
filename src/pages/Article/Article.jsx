import styles from './Article.module.scss'

import userAvatar from '../../assets/avatar.svg'
import heart from '../../assets/heart.svg'
import likeIcon from '../../assets/like.svg'
import Spin from '../../components/Spin'
import { addIdForTags } from '../../helpers/addIdForTags'
import { handleAddLike } from '../../helpers/addLike'
import { formatCreatedDate } from '../../helpers/formatDate'
import { ScrollToTop } from '../../helpers/scrollToTop'
import { deleteArticle, fetchOneArticle } from '../../store/thunks/articlesThunk'

import { Button, Popconfirm } from 'antd'
import Markdown from 'markdown-to-jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Article() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { oneArticle, status } = useSelector((state) => state.articles)
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      dispatch(fetchOneArticle({ slug, token: user.token }))
    } else {
      dispatch(fetchOneArticle({ slug }))
    }
  }, [dispatch, user, slug])

  const text = 'Are you sure to delete this article?'

  const confirm = () => {
    dispatch(deleteArticle({ slug, token: user.token }))
  }

  ScrollToTop()
  return status === 'resolved' && oneArticle ? (
    <div className={styles.article__wrapper}>
      <div className={styles.article}>
        <div className={styles.article__info}>
          <div className={styles.article__titleWrapper}>
            <h5 className={styles.article__title}>{oneArticle.title}</h5>

            <span className={styles.article__likesCount}>
              <button type="button" onClick={(e) => handleAddLike(e, user, dispatch, oneArticle, navigate)}>
                {oneArticle.favorited ? <img src={likeIcon} alt="I like it" /> : <img src={heart} alt="I like it" />}
              </button>
              {oneArticle.favoritesCount}
            </span>
          </div>

          <div className={styles.article__tags}>
            {addIdForTags(oneArticle.tagList).map((tag) => (
              <span key={tag.id} className={styles.article__tag}>
                {tag.tag}
              </span>
            ))}
          </div>

          <p className={styles.article__description}>{oneArticle.description}</p>

          <Markdown className={styles.article__body}>{oneArticle.body}</Markdown>
        </div>

        <div className={styles.article__user}>
          <div className={styles.article__user__info} style={{ display: 'flex' }}>
            <div>
              <h6 className={styles.article__userName}>{oneArticle.author.username}</h6>
              <span className={styles.article__date}>{formatCreatedDate(oneArticle.createdAt)}</span>
            </div>

            <div className={styles.article__avatar}>
              <img src={oneArticle.author.image ? oneArticle.author.image : userAvatar} alt="user avatar" />
            </div>
          </div>

          {user && oneArticle.author.username === user.username ? (
            <div className={styles.article__buttons}>
              <Popconfirm placement="rightTop" title={text} onConfirm={confirm} cancelText="No" okText="Yes">
                <Button className={styles.article__btn} danger>
                  Delete
                </Button>
              </Popconfirm>

              <Link to={`/articles/${slug}/edit`}>
                <Button className={`${styles.article__btn} ${styles.article__edit}`} type="button" ghost>
                  Edit
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <Spin />
  )
}

export default Article

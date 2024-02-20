import { addLike, deleteLike } from '../store/thunks/likesThunk'

export const handleAddLike = (e, user, dispatch, article) => {
  e.preventDefault()

  if (user && !article?.favorited) {
    dispatch(addLike({ slug: article.slug, token: user.token }))
  }

  if (user && article?.favorited) {
    dispatch(deleteLike({ slug: article.slug, token: user.token }))
  }
}

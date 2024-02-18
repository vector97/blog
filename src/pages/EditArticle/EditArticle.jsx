import Form from '../../components/Form'
import { fetchOneArticle } from '../../store/thunks/articlesThunk'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function EditArticle() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const article = useSelector((state) => state.articles.oneArticle)

  useEffect(() => {
    dispatch(fetchOneArticle(slug))
  }, [dispatch, slug])

  return <Form title="Edit article" initialValue={article} mode="editMode" slug={slug} />
}

export default EditArticle

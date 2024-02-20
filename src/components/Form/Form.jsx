import styles from './Form.module.scss'

import { errorHandler } from '../../helpers/errorHandler'
import { getChangedData } from '../../helpers/getChangedData'
import { createNewArticle, updateArticle } from '../../store/thunks/articlesThunk'
import { PATHS } from '../App'

import { Button } from 'antd'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Form({ title, initialValue, mode, slug }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm({
    criteriaMode: 'all',
  })
  const { fields, append, remove, replace } = useFieldArray({
    name: 'tagList',
    control,
  })
  const tagListLength = watch('tagList')?.length === 0

  useEffect(() => {
    if (tagListLength || initialValue?.tagList.length === 0) {
      append('')
    } else if (initialValue) {
      replace(initialValue.tagList)
    }
  }, [append, tagListLength, initialValue, remove, replace])

  const clearTagList = (data) => {
    const tags = []

    data.tagList.forEach((tag) => {
      if (tag !== '') {
        tags.push(tag)
      }
    })

    return { ...data, tagList: tags }
  }

  const onSubmit = (data) => {
    const article = clearTagList(data)

    if (mode === 'createMode') {
      dispatch(
        createNewArticle({
          newArticle: JSON.stringify({ article }),
          token: user.token,
          cb: () => {
            navigate(PATHS.HOME)
          },
        })
      )
    } else if (mode === 'editMode') {
      const editedArticle = getChangedData(article, initialValue)

      dispatch(
        updateArticle({
          slug,
          editedArticle: JSON.stringify({ article: editedArticle }),
          token: user.token,
          cb: () => {
            navigate(PATHS.ARTICLE.replace(':slug', slug))
          },
        })
      )
    }
  }

  return (
    <div className={styles.newArticle__wrapper}>
      <form className={styles.newArticle} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.newArticle__title__wrapper}>
          <h1 className={styles.newArticle__title}>{title}</h1>
        </div>

        <label className={styles.newArticle__label}>
          Title
          <input
            name="title"
            className={styles.newArticle__input}
            type="text"
            placeholder="Title"
            defaultValue={initialValue?.title}
            {...register('title', {
              required: 'This input is required.',
            })}
          />
          {errorHandler('title', errors)}
        </label>

        <label className={styles.newArticle__label}>
          Short description
          <input
            name="description"
            className={styles.newArticle__input}
            type="description"
            placeholder="Short description"
            defaultValue={initialValue?.description}
            {...register('description', {
              required: 'This input is required.',
            })}
          />
          {errorHandler('description', errors)}
        </label>

        <label className={styles.newArticle__label}>
          Text
          <textarea
            name="body"
            className={`${styles.newArticle__input} ${styles.newArticle__textarea}`}
            type="text"
            placeholder="Text"
            defaultValue={initialValue?.body}
            {...register('body', {
              required: 'This input is required.',
            })}
          />
          {errorHandler('body', errors)}
        </label>

        <label className={styles.newArticle__label}>
          Tags
          {fields.map((field, i) => (
            <div key={field.id} className={styles.newArticle__tags}>
              <input
                name="tagList"
                className={`${styles.newArticle__input} ${styles.newArticle__tags__inp}`}
                type="text"
                placeholder="Tag"
                defaultValue={field}
                {...register(`tagList.${i}`, {
                  required: false,
                })}
              />

              <div className={styles.newArticle__buttons}>
                <Button className={styles.newArticle__btn} danger onClick={() => remove(i)}>
                  Delete
                </Button>

                {i === fields.length - 1 && (
                  <Button
                    className={`${styles.newArticle__btn} ${styles.newArticle__btn_add}`}
                    type="primary"
                    ghost
                    onClick={() => append('')}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          ))}
        </label>

        <button type="submit" className={styles.newArticle__submit}>
          Send
        </button>
      </form>
    </div>
  )
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Form

import RequiredAuth from '../../hoc/RequiredAuth'
import Article from '../../pages/Article'
import ArticlesList from '../../pages/ArticlesList'
import CreateArticle from '../../pages/CreateArticle'
import EditArticle from '../../pages/EditArticle'
import Page404 from '../../pages/Page404'
import Profile from '../../pages/Profile'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'
import { setUser } from '../../store/slices/userSlice'
import Layout from '../Layout'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

export const PATHS = {
  HOME: '/',
  ARTICLES: 'articles',
  ARTICLE: '/articles/:slug',
  NEW_ARTICLE: 'new-article',
  EDIT_ARTICLE: '/articles/:slug/edit',
  SIGN_UP: '/signUp',
  SIGN_IN: 'signIn',
  PROFILE: 'profile',
  NOT_FOUND: '*',
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch(setUser(user))
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Layout />}>
        <Route index element={<ArticlesList />} />
        <Route path={PATHS.ARTICLES} element={<ArticlesList />} />
        <Route path={PATHS.ARTICLE} element={<Article />} />
        <Route
          path={PATHS.NEW_ARTICLE}
          element={
            <RequiredAuth>
              <CreateArticle />
            </RequiredAuth>
          }
        />
        <Route path={PATHS.EDIT_ARTICLE} element={<EditArticle />} />
        <Route path={PATHS.SIGN_UP} element={<SignUp />} />
        <Route path={PATHS.SIGN_IN} element={<SignIn />} />
        <Route
          path={PATHS.PROFILE}
          element={
            <RequiredAuth>
              <Profile />
            </RequiredAuth>
          }
        />
      </Route>
      <Route path={PATHS.NOT_FOUND} element={<Page404 />} />
    </Routes>
  )
}

export default App

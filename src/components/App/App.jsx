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
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesList />} />

        <Route path="articles" element={<ArticlesList />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route
          path="new-article"
          element={
            <RequiredAuth>
              <CreateArticle />
            </RequiredAuth>
          }
        />

        <Route path="articles/:slug/edit" element={<EditArticle />} />

        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />

        <Route
          path="profile"
          element={
            <RequiredAuth>
              <Profile />
            </RequiredAuth>
          }
        />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default App

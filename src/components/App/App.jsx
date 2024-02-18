import { ArticlePage, articleLoader } from '../../pages/ArticlePage'
import { BlogPage } from '../../pages/BlogPage'
import HomePage from '../../pages/HomePage'
import SignInPage from '../../pages/SignInPage'
import SignUpPage from '../../pages/SignUpPage'
import Layout from '../Layout'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="articles" element={<BlogPage />} />
      <Route path="articles/:slug" element={<ArticlePage />} loader={articleLoader} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="*" element={<h2>Page not found</h2>} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App

import s from './HomePage.module.scss'

import { BlogPage } from '../BlogPage'

function HomePage() {
  return (
    <div className={s.App}>
      <BlogPage />
    </div>
  )
}

export default HomePage

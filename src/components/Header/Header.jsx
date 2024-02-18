import s from './Header.module.scss'

import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <Link to="/">Realworld Blog</Link>
        </div>

        <nav className={s.navigation}>
          <ul>
            <li>
              <Link className={s.btn} to="/sign-in">
                Sign In
              </Link>
            </li>
            <li>
              <Link className={s.btn} to="/sign-up">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header

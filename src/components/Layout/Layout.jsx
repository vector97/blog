import Header from '../Header'

import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="LayoutWrapper">
      <Header />

      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

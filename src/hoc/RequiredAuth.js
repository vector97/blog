import { PATHS } from '../components/App'

import { Navigate, useLocation } from 'react-router-dom'

function RequiredAuth({ children }) {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    return children
  }

  return <Navigate to={PATHS.SIGN_IN} state={{ from: location }} />
}

export default RequiredAuth

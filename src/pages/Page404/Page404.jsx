import { PATHS } from '../../components/App'

import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={PATHS.HOME}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  )
}

export default Page404

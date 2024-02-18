import styles from './Spin.module.scss'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin as AntSpin } from 'antd'

function Spin() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  )

  return (
    <div className={styles.spin}>
      <AntSpin indicator={antIcon} />
    </div>
  )
}

export default Spin

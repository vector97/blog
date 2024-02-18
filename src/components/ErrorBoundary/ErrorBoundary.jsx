import styles from './ErrorBoundary.module.scss'

import { Alert } from 'antd'
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    if (error) {
      return (
        <div className={styles.error}>
          <Alert message="Ошибка" description="Что-то пошло не так, повторите попытку!" type="error" showIcon />
        </div>
      )
    }

    return children
  }
}

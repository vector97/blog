import styles from './Pagination.module.scss'

import { ScrollToTop } from '../../helpers/scrollToTop'

import { Pagination as ArticlesPagination } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function Pagination({ setPage }) {
  const { totalArticles, currentPage } = useSelector((state) => state.articles)
  const changePage = (page) => {
    setPage(page)
    ScrollToTop()
  }
  return (
    <div className={styles.pagination__wrapper}>
      <ArticlesPagination
        defaultCurrent={1}
        total={+totalArticles}
        current={+currentPage}
        pageSize={+20}
        responsive
        showSizeChanger={false}
        onChange={changePage}
      />
    </div>
  )
}

Pagination.propTypes = {
  setPage: PropTypes.func,
}

Pagination.defaultProps = {
  setPage: () => {},
}

export default Pagination

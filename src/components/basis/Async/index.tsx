import React, { ReactNode } from 'react';
import { AsyncState } from 'react-use/lib/useAsync';
import styles from './Async.module.css'

const classNameRoot = styles.root + ' fadeIn';

type AsyncProps = {
  state: AsyncState<any>,
  children: ReactNode
}

const Async = ({ state, children }: AsyncProps) => {
  if (state.error || state.loading) {
    return (
      <div key="error" className={classNameRoot}>
        <div className={styles.message}>
          {
            state.error
            ? <span>Ошибка: {state.error.message}</span>
            : <span>Загрузка...</span>
          }
        </div>
      </div>
    )
  }

  return (
    <div key="content" className={classNameRoot}>
      {children}
    </div>
  )
}

export default Async;
import React from 'react';
import styles from './Pagination.module.css';

type PaginationProps = {
  page: number,
  size: number,
  sizes: number[],
  actualSize: number,
  total: number,
  onChange(value: { [name: string]: number }): void 
}
const Pagination = ({ page, size, sizes, actualSize, total, onChange }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / size))
  const toPrevious = () => onChange({ page: page - 1 });
  const toNext = () => onChange({ page: page + 1 })
  const canPrevious = page > 1
  const canNext = page < totalPages && actualSize === size
  const setSize = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange({
      size: parseInt(e.target.value),
      page: 1
    });
  }

  return (
    <div className={styles.root}>
      <button onClick={toPrevious} disabled={!canPrevious}>{'←'}</button>
      <div>{page}</div>
      <button onClick={toNext} disabled={!canNext}>{'→'}</button>

      <select
        value={size}
        onChange={setSize}
      >
        {
          sizes.map((size) => (
            <option value={size}>{size}</option>
          ))
        }
      </select>
    </div>
  )
}

export default Pagination;
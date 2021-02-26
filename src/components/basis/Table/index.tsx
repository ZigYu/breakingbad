import React, { useCallback } from 'react';

export type ColumnType<Item> = {
  /** Название колонки для отображения на странице */
  name: string,
  /** Название свойства для выбора из объекта в массиве данных */
  accessor: keyof Item
}

type TableProps<Item> = {
  /** Название ключа для индентификации айтемов */
  itemIdName: keyof Item,
  /** Данные для отображения */
  items: Item[] | undefined,
  /** Настройки колонок таблицы */
  columns: ColumnType<Item>[],
  /** Вызывается при нажатии на строку */
  onClickRow(item: Item): void
}

const Table = <Item, >(props: TableProps<Item>) => {
  return (
    <table>
      <TableHead<Item> {...props} />
      <TableBody<Item> {...props} />
    </table>
  )
}

const TableHead = <Item, >(props: { columns: ColumnType<Item>[] }) => {
  return (
    <thead>
      <tr>
        {
          props.columns.map((column) => { 
            return <th key={String(column.accessor)}>{[column.name]}</th>
          })
        }
      </tr>
    </thead>
  )
}

const TableBody = <Item, >({ itemIdName, items, columns, onClickRow }: TableProps<Item>) => {
  return (
    <tbody>
      {
        items?.map((item) => (
          <TableBodyRow<Item>
            key={String(item[itemIdName])}
            item={item}
            columns={columns}
            onClickRow={onClickRow}
          />
        ))
      }
    </tbody>
  )
}

type TableBodyRowProps<Item> = {
  item: Item,
  columns: ColumnType<Item>[],
  onClickRow(item: Item): void
}
const TableBodyRow = <Item, >({ item, columns, onClickRow }: TableBodyRowProps<Item>) => {
  const handleClick = useCallback((): void => {
    onClickRow(item)
  }, [item, onClickRow])

  return (
    <tr>
      {columns.map((column) => (
        <td
          key={String(column.accessor)}
          onClick={handleClick}
        >
          {
            item[column.accessor]
          }
        </td>
      ))}
    </tr>
  ) 
}

export default Table;
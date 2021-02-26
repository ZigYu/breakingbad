import React, { useCallback, useState } from 'react';
import { useAsync, createGlobalState, useDebounce } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsync';
import { RouteComponentProps } from 'react-router-dom';
import Table, { ColumnType } from 'components/basis/Table';
import Pagination from 'components/basis/Pagination';
import CharactersFilter from 'components/characters/CharactersFilter';
import { TOTAL_CHARACTERS } from 'constant';
import Async from 'components/basis/Async';
import styles from './CharacterList.module.css';
import { ParamsCharacters } from 'api/characters';
import api from 'api';

type GlobalState = {
  page: number,
  size: number,
  name?: string
}

const sizes: number[] = [10, 20, 100]; // доступные варианты кол-ва записей

const defaultGlobalState: GlobalState = {
  page: 1,
  size: sizes[0]
};

const useGlobalState = createGlobalState(defaultGlobalState);


const getParams = (globalState: GlobalState): ParamsCharacters => {
  return {
    limit: globalState.size,
    offset: (globalState.page - 1) * globalState.size,
    name: globalState.name
  }
}

export type CharacterItem = {
  char_id: number,
  name: string,
  birthday: string,
  status: string,
  nickname: string,
  category: string
}

const columns: ColumnType<CharacterItem>[] = [
  { 
    name: 'Идентификатор',
    accessor: 'char_id',
  },
  { 
    name: 'Имя',
    accessor: 'name',
  },
  { 
    name: 'Дата рождения',
    accessor: 'birthday',
  }
];

const CharacterList = ({ history }: RouteComponentProps) => {
  const [globalState = defaultGlobalState, setGlobalState] = useGlobalState();
  const [params, setParams] = useState(getParams(globalState));

  useDebounce(() => {
    setParams(getParams(globalState))
  }, 300, [globalState])

  const state: AsyncState<CharacterItem[]> = useAsync(async () => {
    const response = await api.getCharacters(params);
    return response.data;
  }, [params]);

  const handleClickItem = useCallback(({ char_id }: CharacterItem) => {
    history.push(`/characters/${char_id}`)
  }, [history])

  const handleChangeState = useCallback((value: { [name: string]: number | string | undefined }) => {
    setGlobalState({ ...globalState, ...value });
  }, [setGlobalState, globalState])
  
  return (
    <div className={styles.root + ' fadeIn'}>
      <CharactersFilter
        name={globalState.name}
        onChange={handleChangeState}
      />
      
      <div className={styles.table}>
        <Async state={state}>
          {
            state.value?.length === 0
            ? <div className={styles.message}>
                ничего не найдено
              </div>
            : <Table<CharacterItem>
                itemIdName="char_id"
                items={state.value}
                columns={columns}
                onClickRow={handleClickItem}
              />
          }
        </Async>
      </div>

      <Pagination
        page={globalState.page}
        size={globalState.size}
        sizes={sizes}
        actualSize={state.value?.length || 0}
        total={TOTAL_CHARACTERS}
        onChange={handleChangeState}
      />
    </div>
  )
}

export default CharacterList;
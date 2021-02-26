import React from 'react';
import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsync';
import Async from 'components/basis/Async';
import { CharacterItem } from 'components/characters/CharacterList'
import api from 'api';
import { Link } from 'react-router-dom';

type CharacterCardProps = {
  char_id: number
}

const CharacterCard = ({ char_id }: CharacterCardProps) => {
  const state: AsyncState<CharacterItem[]> = useAsync(async () => {
    const response = await api.getCharacter(char_id)
    return response.data;
  });
  
  return (
    <Async state={state}>
      <div>
        <Link to="/characters">{'< назад'}</Link>
        {
          !state.value || !state.value[0]
          ? <div>персонаж не найден</div>
          : <CharacterTable {...state.value[0]} />
        }
      </div>
    </Async>
  )
}

const CharacterTable = (props: CharacterItem) => {
  const {
    char_id,
    name,
    birthday,
    status,
    nickname,
    category
  } = props;

  return (
    <table>
      <tbody>
        <tr>
          <td>Идентификатор:</td>
          <td>{char_id}</td>
        </tr>

        <tr>
          <td>Имя:</td>
          <td>{name}</td>
        </tr>

        <tr>
          <td>Дата рождения:</td>
          <td>{birthday}</td>
        </tr>

        <tr>
          <td>Статус:</td>
          <td>{status}</td>
        </tr>

        <tr>
          <td>Псевдоним:</td>
          <td>{nickname}</td>
        </tr>

        <tr>
          <td>Категория:</td>
          <td>{category}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default CharacterCard;
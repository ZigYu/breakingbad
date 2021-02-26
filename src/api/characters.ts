import axios from 'axios';
import { BASE_URL_API as baseURL } from 'constant';

export type ParamsCharacters = {
  /** Максимальное кол-во */
  limit: number,
  /** Сколько персонажей пропустить ("отступ") */
  offset: number,
  /** Фильтр по имени персонажа */
  name?: string
}
/** Получение нескольких персонажей в зависимости от параметров */
export const getCharacters = (params: ParamsCharacters) => {
  return axios({ baseURL, url: 'characters', params });
}

/** Получение одного персонажа по идентификатору */
export const getCharacter = (char_id: number) => {
  return axios({ baseURL, url: `characters/${char_id}` });
}
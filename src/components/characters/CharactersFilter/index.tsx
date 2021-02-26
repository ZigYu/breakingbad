import React, { useRef, useState } from 'react';
import { useKey } from 'react-use';
import styles from './Characters.module.css';

type CharactersFilterProps = {
  /** Имя персонажа */
  name: string | undefined,
  onChange(value: { [name: string]: number | string | undefined }): void 
}
const CharactersFilter = ({ name = '', onChange }: CharactersFilterProps) => {
  const [value, setValue] = useState(name);
  const isDisabledInput: boolean = !!name;

  const handleClick = () => {
    if (name) {
      setValue('');
      onChange({ name: undefined, page: 1 });
    } else {
      onChange({ name: value, page: 1 });
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useKey('Enter', handleClick, { target: inputRef.current as HTMLInputElement }, [name, value]);
  
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        disabled={isDisabledInput}
        placeholder="поиск по имени"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={handleClick}
      >
        {name ? '❌' : '🔍'}
      </button>
    </div>
  )
}

export default CharactersFilter;
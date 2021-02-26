import React from 'react';
import styles from './App.module.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharacterList from 'components/characters/CharacterList';
import CharacterCard from 'components/characters/CharacterCard';

const App = () => {
  return (
    <div className={styles.root}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CharacterList} />
          <Route exact path="/characters" component={CharacterList} />
          <Route path="/characters/:char_id" render={(props) => <CharacterCard char_id={props.match.params.char_id} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

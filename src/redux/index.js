import { createStore } from 'redux';
import game from './reducers/game';

let store = createStore(game);

export default store;
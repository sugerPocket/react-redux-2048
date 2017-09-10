import { actions, directions } from '../constants';


export const move = (keyboardCode) => {
  return {
    type: actions.MOVE,
    direction: directions[keyboardCode]
  };
};

export const initOrReset = () => {
  return {
    type: actions.INITORRESET
  };
};

export const setScore = (score) => {
  return {
    type: actions.SET_SCORE,
    score
  };
};

export const addScore = (score) => {
  return {
    type: actions.ADD_SCORE,
    score
  };
};
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
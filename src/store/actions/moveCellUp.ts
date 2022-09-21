import { CellAction } from 'store/actions/types';
import { CellActionTypes } from './types';

const moveCellUp = (id: string): CellAction => {
  return {
    type: CellActionTypes.MOVE_CELL_UP,
    payload: id,
  };
};

export { moveCellUp };

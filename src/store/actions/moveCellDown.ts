import { CellAction } from 'store/actions/types';
import { CellActionTypes } from './types';

const moveCellDown = (id: string): CellAction => {
  return {
    type: CellActionTypes.MOVE_CELL_DOWN,
    payload: id,
  };
};

export { moveCellDown };

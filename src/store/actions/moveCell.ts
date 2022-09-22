import { CellAction, CellMoveDirections } from 'store/actions/types';
import { CellActionTypes } from './types';

const moveCell = (id: string, direction: CellMoveDirections): CellAction => {
  return {
    type: CellActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export { moveCell };

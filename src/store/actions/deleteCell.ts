import { CellAction } from 'store/actions/types';
import { CellActionTypes } from './types';

const deleteCell = (id: string): CellAction => {
  return {
    type: CellActionTypes.DELETE_CELL,
    payload: id,
  };
};

export { deleteCell };

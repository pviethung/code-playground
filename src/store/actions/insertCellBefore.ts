import { CellAction, CellActionTypes, CellTypes } from './types';

const insertCell = (id: string, cellType: CellTypes): CellAction => {
  return {
    type: CellActionTypes.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};

export { insertCell };

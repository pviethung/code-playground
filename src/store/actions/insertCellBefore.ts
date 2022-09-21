import { CellAction, CellActionTypes, CellTypes } from './types';

const insertCellBefore = (
  id: string | null,
  cellType: CellTypes
): CellAction => {
  return {
    type: CellActionTypes.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};

export { insertCellBefore };

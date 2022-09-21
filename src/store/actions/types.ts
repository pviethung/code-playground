type CellTypes = 'text' | 'code';

enum CellActionTypes {
  INSERT_CELL_BEFORE = 'insert_cell_before',
  INSERT_CELL_AFTER = 'insert_cell_after',
}
interface InsertCellBeforeAction {
  type: CellActionTypes.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

interface InsertCellAfterAction {
  type: CellActionTypes.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

type CellAction = InsertCellBeforeAction | InsertCellAfterAction;

export { CellActionTypes };
export type { CellTypes, CellAction };

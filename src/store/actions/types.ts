type CellTypes = 'text' | 'code';

enum CellActionTypes {
  INSERT_CELL_BEFORE = 'insert_cell_before',
  INSERT_CELL_AFTER = 'insert_cell_after',
  DELETE_CELL = 'delete_cell',
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
interface DeleteCell {
  type: CellActionTypes.DELETE_CELL;
  payload: string;
}

type CellAction = InsertCellBeforeAction | InsertCellAfterAction | DeleteCell;

export { CellActionTypes };
export type { CellTypes, CellAction };

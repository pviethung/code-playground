type CellTypes = 'text' | 'code';

enum CellActionTypes {
  INSERT_CELL_BEFORE = 'insert_cell_before',
  INSERT_CELL_AFTER = 'insert_cell_after',
  DELETE_CELL = 'delete_cell',
  MOVE_CELL_UP = 'move_cell_up',
  MOVE_CELL_DOWN = 'move_cell_down',
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
interface MoveCellUp {
  type: CellActionTypes.MOVE_CELL_UP;
  payload: string;
}
interface MoveCellDown {
  type: CellActionTypes.MOVE_CELL_DOWN;
  payload: string;
}

type CellAction =
  | InsertCellBeforeAction
  | InsertCellAfterAction
  | DeleteCell
  | MoveCellUp
  | MoveCellDown;

export { CellActionTypes };
export type { CellTypes, CellAction };

type CellTypes = 'text' | 'code';
type CellMoveDirections = 'up' | 'down';

enum CellActionTypes {
  INSERT_CELL_BEFORE = 'insert_cell_before',
  INSERT_CELL_AFTER = 'insert_cell_after',
  DELETE_CELL = 'delete_cell',
  MOVE_CELL = 'move_cell',
  UPDATE_CELL = 'update_cell',
}

enum BundleActionTypes {
  BUNDLE_START,
  BUNDLE_END,
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

interface MoveCell {
  type: CellActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: CellMoveDirections;
  };
}
interface UpdateCell {
  type: CellActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

interface BundleStartAction {
  type: BundleActionTypes.BUNDLE_START;
  payload: {
    id: string;
    input: string;
  };
}

interface BundleEndAction {
  type: BundleActionTypes.BUNDLE_END;
  payload: {
    id: string;
    code: string;
    error: string;
  };
}

type CellAction =
  | InsertCellBeforeAction
  | InsertCellAfterAction
  | DeleteCell
  | MoveCell
  | UpdateCell;

type BundleAction = BundleStartAction | BundleEndAction;

export { CellActionTypes, BundleActionTypes };
export type { CellTypes, CellAction, BundleAction, CellMoveDirections };

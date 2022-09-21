import produce from 'immer';
import { CellAction, CellActionTypes } from 'store/actions/types';
import { CellsState } from 'store/state';

const uid = () => {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ''
  );
};

const initialState: CellsState = {
  loading: false,
  data: {},
  order: [],
};

const cellReducer = produce(
  (state: CellsState = initialState, action: CellAction): CellsState => {
    switch (action.type) {
      case CellActionTypes.INSERT_CELL_BEFORE:
        const newCellId = uid();
        const currentCellId = action.payload.id;
        const currentCellIdx = currentCellId
          ? state.order.findIndex((id) => id === currentCellId)
          : state.order.length;

        state.data[newCellId] = {
          id: newCellId,
          content: '',
          type: action.payload.type,
        };

        state.order.splice(currentCellIdx, 0, newCellId);
        return state;

      case CellActionTypes.DELETE_CELL:
        const deleteCellId = action.payload;
        const deleteCellIdx = state.order.findIndex(
          (id) => id === deleteCellId
        );
        delete state.data[deleteCellId];
        state.order.splice(deleteCellIdx, 1);

        return state;

      case CellActionTypes.MOVE_CELL_UP:
        const cellUpId = action.payload;
        const cellUpIdx = state.order.findIndex((id) => id === cellUpId);
        const prevCellIdx = cellUpIdx - 1;

        if (prevCellIdx < 0) return state;

        const tempUpCell = state.order[cellUpIdx];
        state.order[cellUpIdx] = state.order[prevCellIdx];
        state.order[prevCellIdx] = tempUpCell;

        return state;

      case CellActionTypes.MOVE_CELL_DOWN:
        const cellDownId = action.payload;
        const cellDownIdx = state.order.findIndex((id) => id === cellDownId);
        const afterCellIdx = cellDownIdx + 1;

        if (afterCellIdx === state.order.length) return state;

        const tempUpDown = state.order[cellDownIdx];
        state.order[cellDownIdx] = state.order[afterCellIdx];
        state.order[afterCellIdx] = tempUpDown;

        return state;

      default:
        return state;
    }
  },
  initialState
);

export { cellReducer };

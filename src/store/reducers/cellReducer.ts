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
      case CellActionTypes.UPDATE_CELL:
        state.data[action.payload.id].content = action.payload.content;

        return state;
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
      case CellActionTypes.MOVE_CELL:
        const moveCellId = action.payload.id;
        const moveCellIdx = state.order.findIndex((id) => id === moveCellId);
        let siblingCellIdx: number;

        if (action.payload.direction === 'up') {
          siblingCellIdx = moveCellIdx - 1;
          if (siblingCellIdx < 0) return state;
        } else {
          siblingCellIdx = moveCellIdx + 1;
          if (siblingCellIdx === state.order.length) return state;
        }

        const tempCell = state.order[moveCellIdx];
        state.order[moveCellIdx] = state.order[siblingCellIdx];
        state.order[siblingCellIdx] = tempCell;

        return state;
      default:
        return state;
    }
  },
  initialState
);

export { cellReducer };

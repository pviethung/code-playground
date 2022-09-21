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

      default:
        return state;
    }
  },
  initialState
);

export { cellReducer };

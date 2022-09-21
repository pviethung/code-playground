import produce from 'immer';
import { CellAction, CellActionTypes } from 'store/actions/types';
import { CellsState } from 'store/state';

function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ''
  );
}

const cellReducer = produce(
  (state: CellsState, action: CellAction): CellsState => {
    switch (action.type) {
      case CellActionTypes.INSERT_CELL_BEFORE:
        const newCellId = uid();
        const beforeCellId = action.payload.id;
        const beforeCellIdx = beforeCellId
          ? state.order.findIndex((id) => id === beforeCellId)
          : state.order.length;

        state.data[newCellId] = {
          id: newCellId,
          content: '',
          type: action.payload.type,
        };

        state.order.splice(beforeCellIdx, 0, newCellId);
        return state;

      default:
        return state;
    }
  }
);

export { cellReducer };

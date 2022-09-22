import { CellAction, CellActionTypes } from 'store/actions/types';
const updateCell = (id: string, content: string): CellAction => {
  return {
    type: CellActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export { updateCell };

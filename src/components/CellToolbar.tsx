import { useAppDispatch } from 'hooks/useAppDispatch';
import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';
import { deleteCell } from 'store/actions/deleteCell';
import { moveCellDown } from 'store/actions/moveCellDown';
import { moveCellUp } from 'store/actions/moveCellUp';
import { CellAction } from 'store/actions/types';

const CellToolbar = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch<CellAction>();
  const deleteCellHandler = () => {
    dispatch(deleteCell(id));
  };
  const moveUpCellHandler = () => {
    dispatch(moveCellUp(id));
  };
  const moveDownCellHandler = () => {
    dispatch(moveCellDown(id));
  };

  return (
    <div className="cell-toolbar">
      <button
        onClick={moveUpCellHandler}
        className="button is-primary is-small"
      >
        <FaArrowUp />
      </button>
      <button
        onClick={moveDownCellHandler}
        className="button is-primary is-small"
      >
        <FaArrowDown />
      </button>
      <button
        onClick={deleteCellHandler}
        className="button is-primary is-small"
      >
        <FaTimes />
      </button>
    </div>
  );
};
export default CellToolbar;

import { useAppActions } from 'hooks/useAppActions';
import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';

const CellActionBar = ({ id }: { id: string }) => {
  const { moveCell, deleteCell } = useAppActions();

  const deleteCellHandler = () => {
    deleteCell(id);
  };
  const moveUpCellHandler = () => {
    moveCell(id, 'up');
  };
  const moveDownCellHandler = () => {
    moveCell(id, 'down');
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
export default CellActionBar;

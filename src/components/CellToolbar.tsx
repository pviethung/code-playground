import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';

const CellToolbar = () => {
  return (
    <div className="cell-toolbar">
      <button className="button is-primary is-small">
        <FaArrowUp />
      </button>
      <button className="button is-primary is-small">
        <FaArrowDown />
      </button>
      <button className="button is-primary is-small">
        <FaTimes />
      </button>
    </div>
  );
};
export default CellToolbar;

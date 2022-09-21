import { useAppDispatch } from 'hooks/useAppDispatch';
import { insertCellBefore } from 'store/actions';
import { CellAction } from 'store/actions/types';
import { CellTypes } from 'store/state';

import './CellDivider.css';

interface CellDividerProps {
  id: string | null;
}

const CellDivider = ({ id }: CellDividerProps) => {
  const dispatch = useAppDispatch<CellAction>();
  const insertCell = (e: React.MouseEvent, type: CellTypes) => {
    dispatch(insertCellBefore(id, type));
  };

  return (
    <div className="cells-divider">
      <button
        className="button is-primary is-small"
        onClick={(e) => insertCell(e, 'text')}
      >
        + Text
      </button>
      <button
        className="button is-primary is-small"
        onClick={(e) => insertCell(e, 'code')}
      >
        + Code
      </button>
    </div>
  );
};
export default CellDivider;

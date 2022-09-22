import { useAppActions } from 'hooks/useAppActions';
import { CellTypes } from 'store/state';

import './CellDivider.css';

interface CellDividerProps {
  id: string | null;
  className?: string;
}

const CellDivider = ({ id, className }: CellDividerProps) => {
  const { insertCellBefore } = useAppActions();

  const insertCell = (type: CellTypes) => {
    // dispatch(insertCellBefore(id, type));
    return (e: React.MouseEvent) => {
      insertCellBefore(id, type);
    };
  };

  return (
    <div className={`cells-divider ${className}`}>
      <button
        className="button is-primary is-small"
        onClick={insertCell('text')}
      >
        + Text
      </button>
      <button
        className="button is-primary is-small"
        onClick={insertCell('code')}
      >
        + Code
      </button>
    </div>
  );
};
export default CellDivider;

import { CellTypes } from 'store/state';
import CellDivider from './CellDivider';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

import './Cell.css';

interface CellProps {
  type: CellTypes;
  id: string;
}

const Cell = ({ id, type }: CellProps) => {
  return (
    <div key={id}>
      <CellDivider id={id} />
      {type === 'text' ? <TextEditor id={id} /> : <CodeCell id={id} />}
    </div>
  );
};
export default Cell;

import { Cell } from 'store/state';
import CellDivider from './CellDivider';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

import './CellListItem.css';

const CellListItem = (cell: Cell) => {
  return (
    <div key={cell.id}>
      <CellDivider id={cell.id} />
      {cell.type === 'text' ? <TextEditor {...cell} /> : <CodeCell {...cell} />}
    </div>
  );
};
export default CellListItem;

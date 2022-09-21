import { useAppSelector } from 'hooks/useAppSelector';
import Cell from './Cell';
import CellDivider from './CellDivider';

import './Cells.css';

const Cells = () => {
  const { order, data } = useAppSelector(({ cell }) => cell);
  return (
    <div className="cells-wrapper">
      {order.length > 0 &&
        order.map((id) => {
          return <Cell key={id} id={id} type={data[id].type} />;
        })}
      <CellDivider id={null} />
    </div>
  );
};
export default Cells;

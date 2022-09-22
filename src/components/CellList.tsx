import { useAppSelector } from 'hooks/useAppSelector';
import CellDivider from './CellDivider';

import './CellList.css';
import CellListItem from './CellListItem';

const CellList = () => {
  const { order, data } = useAppSelector(({ cell }) => cell);
  return (
    <div className="cells-wrapper">
      {order.length > 0 &&
        order.map((id) => {
          return (
            <CellListItem
              content={data[id].content}
              key={id}
              id={id}
              type={data[id].type}
            />
          );
        })}
      <CellDivider className={`${order.length === 0 && 'active'}`} id={null} />
    </div>
  );
};
export default CellList;

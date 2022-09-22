import 'bulmaswatch/solar/bulmaswatch.min.css';
import { useAppSelector } from 'hooks/useAppSelector';

import 'App.css';
import CellList from 'components/CellList';

function App() {
  const order = useAppSelector((state) => state.cell.order);
  console.log('[order] ', order);

  return <CellList />;
}

export default App;

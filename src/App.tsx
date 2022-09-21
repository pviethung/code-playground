import 'bulmaswatch/solar/bulmaswatch.min.css';
import Cells from 'components/Cells';
import { useAppSelector } from 'hooks/useAppSelector';

import 'App.css';

function App() {
  const order = useAppSelector((state) => state.cell.order);
  console.log(order);

  return <Cells />;
}

export default App;

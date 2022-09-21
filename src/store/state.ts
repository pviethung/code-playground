import { CellTypes } from './actions/types';

interface Cell {
  id: string;
  content: '';
  type: CellTypes;
}

interface CellsState {
  loading: boolean;
  data: {
    [id: string]: Cell;
  };
  order: string[];
}

export type { CellsState, CellTypes };

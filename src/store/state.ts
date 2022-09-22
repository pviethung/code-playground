import { CellTypes } from './actions/types';

interface Cell {
  id: string;
  content: string;
  type: CellTypes;
}

interface CellsState {
  loading: boolean;
  data: {
    [id: string]: Cell;
  };
  order: string[];
}

interface BundleState {
  [key: string]: { error: string; code: string };
}

export type { CellsState, CellTypes, Cell, BundleState };

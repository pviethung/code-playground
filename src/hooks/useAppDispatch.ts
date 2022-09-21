import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store';

const useAppDispatch = <A extends Action<any>>() => {
  return useDispatch() as ThunkDispatch<RootState, any, A>;
};

export { useAppDispatch };

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'store/actions';

const useAppActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};

export { useAppActions };

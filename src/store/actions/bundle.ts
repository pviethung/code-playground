import { default as startBundle } from 'bundle/bundle';
import { ThunkDispatch } from 'redux-thunk';
import { BundleAction, BundleActionTypes } from './types';

const bundle = (id: string, input: string) => {
  return async (dispatch: ThunkDispatch<Promise<void>, any, BundleAction>) => {
    dispatch({
      type: BundleActionTypes.BUNDLE_START,
      payload: {
        id,
        input,
      },
    });

    const result = await startBundle(input);

    dispatch({
      type: BundleActionTypes.BUNDLE_END,
      payload: {
        id,
        code: result.code,
        error: result.error,
      },
    });
  };
};

export { bundle };

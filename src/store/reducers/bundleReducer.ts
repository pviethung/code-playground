import { produce } from 'immer';
import { BundleAction, BundleActionTypes } from 'store/actions/types';
import { BundleState } from 'store/state';

const initialState = {};

const bundleReducer = produce(
  (state: BundleState = initialState, action: BundleAction): BundleState => {
    switch (action.type) {
      case BundleActionTypes.BUNDLE_START:
        return state;

      case BundleActionTypes.BUNDLE_END:
        state[action.payload.id] = {
          code: action.payload.code,
          error: action.payload.error,
        };

        return state;
      default:
        return state;
    }
  },
  initialState
);

export { bundleReducer };

import { useReducer, useCallback } from 'react';

const INITIAL_STATE = {
  status: 'idle',
  value: null,
  error: null,
};

function asyncReducer(state, action) {
  switch (action.type) {
    case 'idle': {
      return { ...state, status: 'idle' };
    }
    case 'pending': {
      return { ...state, status: 'pending', value: null, error: null };
    }
    case 'success': {
      return {
        ...state,
        status: 'success',
        value: action.payload,
        error: null,
      };
    }
    case 'error': {
      return {
        ...state,
        status: 'success',
        value: null,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

function useAsync(asyncFunction) {
  const [state, dispatch] = useReducer(asyncReducer, INITIAL_STATE);

  const { status, value, error } = state;

  const handleAsyncCall = useCallback(
    async (args) => {
      try {
        dispatch({ type: 'pending' });

        const response = await asyncFunction(args);

        dispatch({
          type: 'success',
          payload: response,
        });
      } catch (error) {
        dispatch({
          type: 'error',
          payload:
            error.message || 'Something went wrong contacting the server',
        });
      }
    },
    [asyncFunction]
  );

  return [handleAsyncCall, status, error, value];
}

export default useAsync;

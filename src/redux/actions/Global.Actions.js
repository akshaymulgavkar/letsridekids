export const TYPES = {
    GLOBAL_RESET: 'GLOBAL_RESET',
  };
  
  export const globalReset = () => ({
    type: TYPES.GLOBAL_RESET,
    payload: null,
  });
  
  export const resetGlobal = () => async (dispatch) => {
    dispatch(globalReset());
  };
  
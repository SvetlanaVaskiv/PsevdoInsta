export const actionPromise = (name, promise) => {
  const actionPending = () => ({
    type: "PROMISE",
    name,
    status: "PENDING",
    payload: null,
    error: null,
  });
  const actionResolved = (payload) => ({
    type: "PROMISE",
    name,
    status: "RESOLVED",
    payload,
    error: null,
  });
  const actionRejected = (error) => ({
    type: "PROMISE",
    name,
    status: "REJECTED",
    payload: null,
    error,
  });

  return async (dispatch) => {
    dispatch(actionPending());
    let payload;
    try {
      payload = await promise;
      dispatch(actionResolved(payload));
    } catch (e) {
      dispatch(actionRejected(e));
    }
    return payload;
  };
};

export const getQuery = store => store.query;
export const getVars = store => ({ ...store.vars, ...store.searchVars });

export const getCredentials = store => {
  const { endpoint, token } = store;
  if (!endpoint || !token) {
    return null;
  }
  return { endpoint, token };
};

export const getResult = store => store.result;
export const getError = store => store.queryError;
export const getDataSelector = store => store.dataSelector;

export const getViewCredentials = ({ viewId, projectId, stage }) => ({ viewId, projectId, stage });
export const getSearchVars = ({ searchVars }) => searchVars;

export const getRequestState = ({ loading, queryError, result }) => {
  if (queryError) return 'Error';
  if (loading || !result) return 'Loading';
  if (result) return 'Success';
  return 'Error';
};

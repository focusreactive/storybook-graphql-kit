import { getQuery, getCredentials, getVars } from './selectors';
import { request } from './client';

export const startRequest = store => ({
  ...store,
  result: null,
  loading: true,
  queryError: null,
});

export const contentRequest = async store => {
  const query = getQuery(store);
  const credentials = getCredentials(store);
  const vars = getVars(store);
  try {
    const data = await request({ ...credentials, query, vars });
    if (!data)
      throw new Error(`No data from query\n\n${query}\n\nwith vars:\n\n${JSON.stringify(vars)}`);
    const { result } = data;
    if (!result)
      throw new Error(
        `Query should has alias \`result\` on the top level to extract data.\nInstead got:\n${data}`
      );
    return {
      ...store,
      rowResult: data.result,
      queryError: null,
      loading: false,
    };
  } catch (err) {
    return {
      ...store,
      result: undefined,
      queryError: err.message,
      loading: false,
    };
  }
};

export const updateSearch = (store, searchVars) => ({
  ...store,
  searchVars,
});

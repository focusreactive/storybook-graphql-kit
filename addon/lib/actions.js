import { getQuery, getCredentials, getVars } from './selectors'
import { request } from './client'

export const contentRequest = async store => {
  const query = getQuery(store);
  const credentials = getCredentials(store);
  const vars = getVars(store);
  try {
    const result = await request({ ...credentials, query, vars });
    return {
      ...store,
      result,
    }
  } catch (err) {
    return {
      ...store,
      result: undefined,
      queryError: err.message
    }
  }
};

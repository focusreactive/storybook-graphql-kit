import { createDecorator, setParameters } from '@storybook/addon-devkit';

import DecoratorUI from './DecoratorUI';
import { getError, getDataSelector, getViewCredentials, getRequestState } from './lib/selectors';
import './config';

const selectors = {
  info: store => JSON.stringify(store),
  isConnected: store => store.isConnected,
  rowResult: store => store.rowResult,
  error: getError,
  dataSelector: getDataSelector,
  viewCredentials: getViewCredentials,
  state: getRequestState,
};

const getDataDefault = data => {
  const keys = Object.keys(data)
  if (keys.length === 1) {
    return data[keys[0]]
  }
  return data
}

const paramSelectors = {
  result: (parameters, selectors) => {
    try {
      const { getData = getDataDefault } = parameters;
      if (!getData || !selectors.rowResult) return selectors.rowResult;
      const params = getData(selectors.rowResult);
      return params;
    } catch (err) {
      console.warn(err)
      return selectors.rowResult
    }
  }
}

export const withGraphQL = createDecorator({
  ...selectors,
}, {}, paramSelectors)(DecoratorUI, { isGlobal: false });

export const QueryParams = setParameters();

export const Query = ({ name, story = () => null, ...rest }) => {
  // eslint-disable-next-line no-param-reassign
  story.story = {
    name,
    parameters: QueryParams({ ...rest, isConnected: true, loading: true }),
  };
  return story;
};

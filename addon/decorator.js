import { createDecorator, setParameters } from '@storybook/addon-devkit';

import DecoratorUI from './DecoratorUI';
import { getError, getDataSelector, getViewCredentials, getRequestState } from './lib/selectors';
import './config';

const selectors = {
  info: store => JSON.stringify(store),
  isConnected: store => store.isConnected,
  result: store => store.result,
  error: getError,
  dataSelector: getDataSelector,
  viewCredentials: getViewCredentials,
  state: getRequestState,
};

export const withGraphCMS = createDecorator({
  ...selectors,
})(DecoratorUI, { isGlobal: false });

export const QueryParams = setParameters();

export const Query = ({ name, story = () => null, ...rest }) => {
  // eslint-disable-next-line no-param-reassign
  story.story = {
    name,
    parameters: QueryParams({ ...rest, isConnected: true, loading: true }),
  };
  return story;
};

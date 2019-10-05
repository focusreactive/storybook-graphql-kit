import { createDecorator } from '@storybook/addon-devkit'
import { setParameters } from '@storybook/addon-devkit'


import DecoratorUI from './DecoratorUI'
import { getError, getDataSelector } from './lib/selectors'

const selectors = {
  info: store => JSON.stringify(store),
  isConnected: store => store.isConnected,
  result: store => store.result,
  error: getError,
  dataSelector: getDataSelector,
};

export const withGraphCMS = createDecorator({
  ...selectors,
},
)(DecoratorUI, { isGlobal: false });

export const QueryParams = setParameters()

export const Query = ({ name, ...rest }) => {
  const storyFn = () => null;
  storyFn.story = {
    name,
    parameters: QueryParams({ ...rest, isConnected: true })
  }
  return storyFn;
}
import { register } from '@storybook/addon-devkit';

import PanelUI from './PanelUI';
import { startRequest, contentRequest, updateSearch } from './lib/actions';
import { getSearchVars, getResult } from './lib/selectors';
import './config';

const selectors = {
  searchVars: getSearchVars,
  rowResult: getResult,
  isConnected: store => store.isConnected,
};

const actions = ({ local }) => ({
  request: local(contentRequest),
  search: local(updateSearch),
  startRequest: local(startRequest),
});

register(selectors, actions)(PanelUI);
console.log('test')
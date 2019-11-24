import { register } from '@storybook/addon-devkit';

import PanelUI from './PanelUI';
import { startRequest, contentRequest, updateSearch } from './lib/actions';
import { getSearchVars } from './lib/selectors';
import './config';

const selectors = {
  searchVars: getSearchVars,
  isConnected: store => store.isConnected,
};

const actions = ({ local }) => ({
  request: local(contentRequest),
  search: local(updateSearch),
  startRequest: local(startRequest),
});

register(selectors, actions)(PanelUI);
console.log('test')
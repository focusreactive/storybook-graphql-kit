import { register } from '@storybook/addon-devkit';

import PanelUI from './PanelUI';
import { startRequest, contentRequest, updateSearch, editResult } from './lib/actions';
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
  onEdit: local(editResult)
});

register(selectors, actions)(PanelUI);

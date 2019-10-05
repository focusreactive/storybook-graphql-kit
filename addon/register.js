import { register } from '@storybook/addon-devkit'

import PanelUI from './PanelUI'
import { contentRequest } from './lib/actions'

const selectors = {
  info: store => JSON.stringify(store),
  isConnected: store => store.isConnected,
};

const actions = ({ global, local }) => ({
  request: local(contentRequest),
})

register(selectors,
  actions
)(PanelUI);

import { register } from '@storybook/addon-devkit'

import PanelUI from './PanelUI'

const selectors = {};

register({
  ...selectors,
},
)(PanelUI);

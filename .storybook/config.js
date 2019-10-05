import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import '@storybook/addon-console';
import { withMyAddon } from '../addon/decorator';
import brandImage from '../docs/logo.png';

addDecorator(withMyAddon({ }))

const theme = create({
  base: 'light',

  colorSecondary: '#fe7800',
  brandTitle: 'GitNation',
  brandUrl: 'https://gitnation.org/',
  brandImage,
});


addParameters({
  options: {
    theme,
  },
});

configure(require.context('../src/stories', true, /\.stories\.js$/), module);

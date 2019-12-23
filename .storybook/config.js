import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import '@storybook/addon-console';
import { withGraphCMS } from '../addon/decorator';
import brandImage from '../docs/logo.png';

addDecorator(withGraphCMS({ endpoint: process.env.CMS_ENDPOINT, token: process.env.CMS_TOKEN, projectId: process.env.PROJECT_ID, stage: process.env.STAGE }))

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

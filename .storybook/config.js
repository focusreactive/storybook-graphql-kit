import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import '@storybook/addon-console';
import { withGraphCMS } from '../addon/decorator';
import brandImage from '../docs/logo.png';

const CMS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiN2Y5ZTE0YzYtOTUwZi00M2Q1LWI0NmQtZmVlNDAzNGQ1MGU4In0.-ciA-_yc1XybCAo7E7JNax_CkGxmbekjn7guE2moNro'
const CMS_ENDPOINT = 'https://api-euwest.graphcms.com/v1/ck0qr5av4094801d49206aeqn/master'

addDecorator(withGraphCMS({ endpoint: CMS_ENDPOINT, token: CMS_TOKEN }))

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

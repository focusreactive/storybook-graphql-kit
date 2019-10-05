import { createDecorator } from '@storybook/addon-devkit'

import DecoratorUI from './DecoratorUI'

const selectors = {};

export const withMyAddon = createDecorator({
    ...selectors,
  },
)(DecoratorUI, { isGlobal: false });

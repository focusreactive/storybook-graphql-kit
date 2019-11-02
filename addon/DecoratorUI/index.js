import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { parseResult } from '../lib/parse';
import DefaultTable from './DefaultTable';

const theme = createMuiTheme({
  palette: {
    themeColor: '#525252',
  },
});

const DecoratorUI = ({ context, getStory, isConnected, result, viewCredentials, state }) => {
  if (!isConnected) {
    return getStory(context);
  }

  const isLoading = state === 'Loading';

  const { columns, rows } = parseResult(result, { viewCredentials });

  return (
    <ThemeProvider theme={theme}>
      <DefaultTable columns={columns} rows={rows} result={result} isLoading={isLoading} />
    </ThemeProvider>
  );
};

export default DecoratorUI;

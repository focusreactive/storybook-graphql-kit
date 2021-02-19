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

const DecoratorUI = ({ getStory, isConnected, result, viewCredentials, state, customRenders }) => {
  if (!isConnected) {
    return null;
  }

  const isLoading = state === 'Loading';
  const isLoaded = state === 'Success';

  const { columns, rows } = parseResult(result, {
    viewCredentials,
    customRenders,
  });

  if (isLoaded) {
    const story = getStory({
      graphQlResponse: { result, columns, rows },
    });
    if (story) return story;
  }

  return (
    <ThemeProvider theme={theme}>
      <DefaultTable columns={columns} rows={rows} result={result} isLoading={isLoading} />
    </ThemeProvider>
  );
};

export default DecoratorUI;

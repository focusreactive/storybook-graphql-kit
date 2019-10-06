import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { parseResult } from '../lib/parse'
import { createLink } from '../lib/links'
import DefaultTable from './DefaultTable'

const theme = createMuiTheme({
  palette: {
    themeColor: '#525252'
  },
});

const DecoratorUI = ({ context, getStory, isConnected, result, info, error, dataSelector, viewCredentials, state }) => {
  if (!isConnected) {
    return getStory(context)
  }

  const isLoading = state === 'Loading';


  const { columns, rows } = parseResult(result);
  const createEntryLink = createLink(viewCredentials);

  return (
    <ThemeProvider theme={theme}>
      <DefaultTable columns={columns} rows={rows} result={result} createEntryLink={createEntryLink} isLoading={isLoading}/>
    </ThemeProvider>
  );
}

export default DecoratorUI;

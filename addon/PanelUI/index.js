import React from 'react';
import { Layout, Block } from '@storybook/addon-devkit';
import { styled } from '@storybook/theming';
import ReactJson from 'react-json-view'
import SearchInputs from './SearchInputs';

const LayoutBlock = styled(Layout)`
  margin: 0px;
  height: 100px;
`;

const AddonBlock = styled(Block)`
  border: 1px solid gray;
  margin: 2px;
  padding: 8px;
  overflow: auto;
`;

const Panel = ({ startRequest, request, kind, story, isFirstDataReceived, searchVars, search, rowResult }) => {
  React.useEffect(() => {
    if (isFirstDataReceived) {
      startRequest();
      request();
    }
  }, [kind, story, request, startRequest, isFirstDataReceived, searchVars]);

  if (!isFirstDataReceived) return null;

  return (
    <LayoutBlock>
      <AddonBlock size="30%">
        <SearchInputs search={searchVars} onChange={search} />
      </AddonBlock>
      <AddonBlock>
      <ReactJson src={rowResult} name="data" collapsed={4} collapseStringsAfterLength={30}/>
      </AddonBlock>
    </LayoutBlock>
  );
};

export default Panel;

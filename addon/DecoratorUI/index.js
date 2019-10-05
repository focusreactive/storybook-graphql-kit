import React from 'react';

const DecoratorUI = ({ context, getStory, selectedData }) => (
  <div>
    <h1>Title: {selectedData}</h1>
    {getStory(context)}
  </div>
);

export default DecoratorUI
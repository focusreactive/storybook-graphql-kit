import React from 'react';
import Input from './Input';

const SearchInputs = ({ search, onChange }) => {
  const searchVars = Object.keys(search);
  const updateVar = key => value => {
    onChange({
      ...search,
      [key]: value,
    });
  };

  return searchVars.map(v => <Input value={search[v]} onChange={updateVar(v)} label={v} key={v} />);
};

export default SearchInputs;

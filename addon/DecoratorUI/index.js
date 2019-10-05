import React from 'react';

const Entry = ({ obj }) => <div><hr />{JSON.stringify(obj)}</div>

const DecoratorUI = ({ context, getStory, isConnected, result, info, error, dataSelector }) => {
  if (!isConnected) {
    return getStory(context)
  }

  if (!result) return <div>Loading...</div>

  const table = result.conf.year[0].pages; // dataSelector(result);
  console.log("TCL: DecoratorUI -> table", table)

  if (!table) return <div>Can't process</div>

  return table.map((obj, key) => <Entry key={key} obj={obj} />)
}

export default DecoratorUI
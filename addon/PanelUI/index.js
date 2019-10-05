import React from 'react';

const Panel = ({ request, kind, story, isFirstDataReceived }) => {
  React.useEffect(() => {
    if (isFirstDataReceived) {
      request();
    }
  }, [kind, story, request, isFirstDataReceived]);

  if (!isFirstDataReceived) return null;

  return (<div>
    <p>GrapCMS Panel</p>
    <button onClick={() => request()} >Request</button>
  </div>)
}

export default Panel
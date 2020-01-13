import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const getStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  imageContainer: {
    maxWidth: 200,
    height: 150,
  },
}));


const RenderImage = ({ url, alt, details }) => {
  const { imageContainer } = getStyles();
  return (
    <Tooltip title={details}>
      <img className={imageContainer} src={url} alt={alt || 'image'} />
    </Tooltip>
  );
};

export const renderImage = ({ url, alt, value }) => {
  const entries = typeof value === 'string' ? ['url', url] : Object.entries(value);
  const details = entries.map(([key, val]) => <div key={key}>{`${key}: ${val}`}</div>);
  return () => <RenderImage url={url} alt={alt} details={details} />;
};

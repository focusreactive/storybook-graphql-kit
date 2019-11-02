import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { createGraphCMSEntryEditLink } from './links';

const getStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  imageContainer: {
    maxWidth: 200,
    height: 150,
  },
}));

const LinkAction = ({ url, classes, id }) => (
  <Tooltip title={`Edit entry ${id} in GraphCMS`}>
    <IconButton
      href={url}
      target="_blank"
      variant="extended"
      aria-label="delete"
      className={classes.fab}
      size="small"
    >
      <EditIcon className={classes.extendedIcon} />
    </IconButton>
  </Tooltip>
);

export const renderLinkAction = ({ viewId, projectId, stage, entryId }) => {
  const classes = getStyles();
  const url = createGraphCMSEntryEditLink({ viewId, projectId, stage, entryId });
  return () => <LinkAction url={url} classes={classes} id={entryId} />;
};

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

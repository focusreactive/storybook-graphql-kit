export const createGraphCMSEntryEditLink = ({ viewId, projectId, stage, entryId }) =>
  `https://app.graphcms.com/${projectId}/${stage}/content/${viewId}/table/${entryId}`;

import React from 'react';
import { QueryParams, Query } from '../../addon/decorator';

import UserAvatar from '../UserAvatar';

export default {
  title: 'with React Components',
};

const viewId = 'e981e312fd6c48a39230de9193be4db9';

const query = /* GraphQL */ `
  query($conferenceTitle: ConferenceTitle, $eventYear: EventYear, $name: String) {
    result: speakers(
      where: {
        conferenceEvents_some: { year: $eventYear, conferenceBrand: { title: $conferenceTitle } }
        name_contains: $name
      }
    ) {
      id
      # bio
      name
      talks {
        title
      }
      avatar {
        mimeType
        url
      }
    }
  }
`;

export const ram = Query({
  name: 'React Amsterdam',
  story: ({ graphQlResponse } = {}) => {
    const data = graphQlResponse.result;
    if (!data) return null;

    return (
      <div style={{ display: 'flex' }}>
        {data.map(props => (
          <UserAvatar src={props.avatar.url} key={props.name} name={props.name} bio={props.bio} />
        ))}
      </div>
    );
  },
  query,
  vars: { conferenceTitle: 'React_Amsterdam', eventYear: 'Y2020' },
  searchVars: { name: '' },
  viewId,
});

export const rdbStory = ({ graphQlResponse }) => {
  const data = graphQlResponse.result;
  if (!data) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.map(props => (
        <UserAvatar
          src={props.avatar && props.avatar.url}
          key={props.name}
          name={props.name}
          bio={props.bio}
        />
      ))}
    </div>
  );
};

rdbStory.story = {
  name: 'React Day Berlin',
  parameters: QueryParams({
    query,
    vars: { conferenceTitle: 'React_Day_Berlin', eventYear: 'Y2019' },
    searchVars: { name: '' },
    viewId,
    isConnected: true,
  }),
};

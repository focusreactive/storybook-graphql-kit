import React from 'react';
import { Query } from '../../addon/decorator';

import UserAvatar from '../UserAvatar';

export default {
  title: 'with React Components',
};

const viewId = 'e981e312fd6c48a39230de9193be4db9';

const imageUrlFragment = /* GraphQL */ `
  fragment imageUrl on Speaker {
    avatar {
      url(transformation: {image: {resize: {width: 500, height: 500, fit: crop}}, document: {output: {format: jpg}}})
    }
  }
`;

const speakerFragment = /* GraphQL */ `
  fragment speaker on PieceOfSpeakerInfo {
    label
    speaker {
      name
      company
      country
      bio
      githubUrl
      twitterUrl
      ...imageUrl
    }
  }

  ${imageUrlFragment}
`;

const query = /* GraphQL */ `
  query($conferenceTitle: ConferenceTitle, $eventYear: EventYear, $name: String) {
    result: conferenceBrand(where: { title: $conferenceTitle }) {
      id
      status
      year: conferenceEvents(where: { year: $eventYear }) {
        id
        status
        openForTalks
        speakers: pieceOfSpeakerInfoes(orderBy: order_DESC, where: {speaker: {name_contains: $name}}) {
          ...speaker
        }
      }
    }
  }

  ${speakerFragment}
`;

export const ram = Query({
  name: 'React Amsterdam',

  query,
  vars: { conferenceTitle: 'React_Amsterdam', eventYear: 'Y2020' },
  searchVars: { name: '' },
  viewId,
  getData: data => data.year[0].speakers
});

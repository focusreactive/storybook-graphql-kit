import { Query } from '../../addon/decorator';

export default {
  title: 'with getData',
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
      year: conferenceEvents(where: { year: $eventYear }) {
        id
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
  getData: data => console.log(data) || data.result.year[0].speakers
});

import { Query } from '../../addon/decorator';

export default {
  title: 'Speakers',
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
      bio
      # name
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

export const rdb = Query({
  name: 'React Day Berlin 2019',
  query,
  vars: { conferenceTitle: 'React_Day_Berlin', eventYear: 'Y2019' },
  searchVars: { name: '' },
  viewId,
});

export const ram = Query({
  name: 'React Amsterdam',
  query,
  vars: { conferenceTitle: 'React_Amsterdam', eventYear: 'Y2020' },
  searchVars: { name: '' },
  viewId,
});

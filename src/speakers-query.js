const query = /* GraphQL */ `
  query($conferenceTitle: ConferenceTitle, $eventYear: EventYear, $name: String) {
    result: speakers(
      where: {
        conferenceEvents_some: { year: $eventYear, conferenceBrand: { title: $conferenceTitle } }
        name_contains: $name
      }
    ) {
      name
      avatar {
        mimeType
        url
      }
      bio
      talks {
        title
      }
      id
    }
  }
`;

export default query;

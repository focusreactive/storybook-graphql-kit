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

export default query;

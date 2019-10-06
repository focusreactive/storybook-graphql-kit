import { Query } from '../../addon/decorator'

export default {
  title: 'Events/React Day Berlin',
};

const queryPages = /* GraphQL */ `
  query ($conferenceTitle: ConferenceTitle, $eventYear: EventYear, $title: String, $key: String) {
  result: pages(where: {conferenceEvent: {year: $eventYear, conferenceBrand: {title: $conferenceTitle}}, titlePage_contains: $title, key_contains: $key}) {
    id
    seoDescription
    titleSeo
    key
    description
    titlePage
    pageSlogan
    locationTitle
  }
}
`;

const queryTexts = /* GraphQL */ `
  query ($conferenceTitle: ConferenceTitle, $eventYear: EventYear, $markdown: String, $key: String) {
    result: pieceOfTexts(where: {conferenceEvent: {year: $eventYear, conferenceBrand: {title: $conferenceTitle}}, markdown_contains: $markdown, key_contains: $key}) {
      id
      markdown
      key
    }
  }
`

const conferenceTitle = 'React_Day_Berlin';
const eventYear = 'Y2019';

export const pages = Query({ query: queryPages, vars: { conferenceTitle, eventYear }, searchVars: { title: '', key: '' }, viewId: '5f0d4bba1a384274b8259ed15cdcfea9', name: 'Pages' });

export const texts = Query({ query: queryTexts, vars: { conferenceTitle, eventYear }, searchVars: { markdown: '', key: '' }, viewId: 'c04bfcdd2eed47b880588f5506ed4f5a', name: 'Texts' });

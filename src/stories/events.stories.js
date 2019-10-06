import { Query } from '../../addon/decorator'

export default {
  title: 'Events',
};

const queryPages = /* GraphQL */ `
  query ($conferenceTitle: ConferenceTitle, $eventYear: EventYear, $title: String) {
  result: pages(where: {conferenceEvent: {year: $eventYear, conferenceBrand: {title: $conferenceTitle}}, titlePage_contains: $title}) {
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

const conferenceTitle = 'React_Day_Berlin';
const eventYear = 'Y2019';

export const brands = Query({ query: queryPages, vars: { conferenceTitle, eventYear }, searchVars: { title: 'React Day Berlin', description: 'React' }, viewId: '5f0d4bba1a384274b8259ed15cdcfea9' })
export const events = Query({ query: queryPages, vars: { conferenceTitle, eventYear }, searchVars: { title: 'react day', description: 'React' }, viewId: '5f0d4bba1a384274b8259ed15cdcfea9' })
export const sponsors = Query({ query: queryPages, vars: { conferenceTitle, eventYear }, searchVars: { title: 'react day', description: 'React' }, viewId: '5f0d4bba1a384274b8259ed15cdcfea9' })
export const speakers = Query({ query: queryPages, vars: { conferenceTitle, eventYear }, searchVars: { title: 'react day', description: 'React' }, viewId: '5f0d4bba1a384274b8259ed15cdcfea9' })


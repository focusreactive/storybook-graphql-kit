import React from 'react';

import { Query } from '../../addon/decorator'

export default {
  title: 'Events',
};

const queryPages = /* GraphQL */ `
  query($conferenceTitle: ConferenceTitle, $eventYear: EventYear) {
    conf: conferenceBrand(where: { title: $conferenceTitle }) {
      id
      status
      year: conferenceEvents(where: { year: $eventYear }) {
        id
        status
        pages {
          titleSeo
          description
          seoDescription
          key
          titlePage
          pageSlogan
          pageStatistics
          locationTitle
          themeColor {
            hex
          }
          keywords
          pageNavigation
          pageSections
        }
      }
    }
  }
`;

const dataSelector = data => {
  return data.conf.year[0].pieceOfTexts
}

const conferenceTitle = 'React_Day_Berlin';
const eventYear = 'Y2019';

export const brands = Query({ query: queryPages, dataSelector, vars: { conferenceTitle, eventYear } })
export const events = Query({ query: queryPages, dataSelector, vars: { conferenceTitle, eventYear } })
export const sponsors = Query({ query: queryPages, dataSelector, vars: { conferenceTitle, eventYear } })
export const speakers = Query({ query: queryPages, dataSelector, vars: { conferenceTitle, eventYear } })


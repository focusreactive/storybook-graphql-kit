import { Query } from '../../addon/decorator';
import query from '../speakers-query'

export default {
  title: 'Speakers',
};

const viewId = 'e981e312fd6c48a39230de9193be4db9';

export const rdb = Query({
  name: 'React Day Berlin 2019',
  query,
  vars: { conferenceTitle: 'React_Day_Berlin', eventYear: 'Y2019' },
  searchVars: { name: '' },
  viewId,
});

export const ram = Query({
  name: 'React Amsterdam 2020',
  query,
  vars: { conferenceTitle: 'React_Amsterdam', eventYear: 'Y2020' },
  searchVars: { name: '' },
  viewId,
});

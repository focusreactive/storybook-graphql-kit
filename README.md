# Storybook GraphQL Kit [![npm version](https://badge.fury.io/js/%40focus-reactive%2Fstorybook-graphql-kit.svg)](https://badge.fury.io/js/%40focus-reactive%2Fstorybook-graphql-kit) [![Storybook](https://raw.githubusercontent.com/storybookjs/storybook-addon-console/master/docs/storybook.svg?sanitize=true)](https://focusreactive.github.io/storybook-graphql-kit)

[![Storybook](https://raw.githubusercontent.com/focusreactive/storybook-graphql-kit/master/docs/storybook-logo.png)](https://storybook.js.org/)
[![GraphQL](https://raw.githubusercontent.com/focusreactive/storybook-graphql-kit/master/docs/graphql.png)](https://graphql.org/)

Write GraphQL queries and pass response data to your components **or just display them**

## Why you want to use it

### 1. Develop components

Develop your components in isolation with actual backend stored data. With this addon you can add query to your stories and use fetched data as props for your components. You are flexible to use it with a single component or return an array of components - everything you need is just to write stories.

![Screenshot1](https://raw.githubusercontent.com/focusreactive/storybook-graphql-kit/master/docs/screenshot-example1.png)

### 2. Browse database

You can simply use Storybook and this addon for rapid development of tools to browse your GraphQL endpoint. Just write the queries for data you want to show and it will be outputted as a table. If you have arrays, nested objects or images inside your query it will be turned to friendly visible form. Good for documenting things withing your team.

![Screenshot2](https://raw.githubusercontent.com/focusreactive/storybook-graphql-kit/master/docs/screenshot-example2.png)


## Usage

Install addon

```shell
yarn add --dev @focus-reactive/storybook-graphql-kit
```

Add addon to your Storybook

```js
// addons.js

import "@focus-reactive/storybook-graphql-kit/register";
```

Configure addon

```js
// config.js or in your stories.js
import { addDecorator } from '@storybook/react';
import { withGraphQL } from "@focus-reactive/storybook-graphql-kit";

addDecorator(
  withGraphQL({
    endpoint: YOUR_GRAPHQL_ENDPOINT,
    token: YOUR_GRAPHQL_TOKEN,
  })
);

```

Write stories

```js
// stories.js

import { QueryParams } from '@focus-reactive/storybook-graphql-kit';

export default {
  title: 'Browse GraphQL',
};

// write a query in your preferred way
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

// In Storybook v.5 you can simply export you stories from `stories.js` files. You can use `storiesOf(...).add(...)` syntax if prefer
export const speakers = ({ graphQlResponse }) => {
  const data = graphQlResponse.result;
  return null;
  // or pass data to your components
};

// You need to pass parameters to your story
speakers.story = {
  name: 'Conference Speakers',
  parameters: QueryParams({
    query,
    vars: { conferenceTitle: 'React_Day_Berlin', eventYear: 'Y2019' },
    searchVars: { name: '' },
    isConnected: true,
  }),
};


```

Note some details here:

1. See how we return `null` from the story function. In this case the default UI will be used to display data in a table form. It's useful if you just want to quickly see the results of your request.
2. If you return a React Component from your story it will behave as regular Storybook story except the additional field in the `story context` passed to the function that will contain fetched data. You story will be rendered **only after** data will be successfully received, so `({ graphQlResponse: { result } })` always has result of your query.
3. You can pass variables in `vars` and `searchVars` fields to the query as you usually do for GraphQL requests. The difference of `searchVars` is that there will be input fields in the addon panel and users can use them for searching
4. Settings passed to `withGraphQL` and to `QueryParams` are merged into one object before using. You can pass them in any order or even use only one of them. Just do it in the most convenient way for you

Instead of passing options to the story how it's shown above you can `import { Query } from '@focus-reactive/storybook-graphql-kit';` and pass all options via this helper:

```js
import { Query } from '@focus-reactive/storybook-graphql-kit';

export const speakers = Query({
  name: 'Conference Speakers',
  query,
  vars: { conferenceTitle: 'React_Day_Berlin', eventYear: 'Y2019' },
  searchVars: { name: '' },
  viewId,
});

```

It does totally the same but in more compact way, especially if you only want to have the default view.

## Features

1. You don't need to write `stories` or even use `React` if you only want to view the results of queries. It has convenient default UI to display your data.
2. Expands nested objects to display in flat table
3. Detects `url` fields with image sources and outputs them
4. Input fields for GraphQL variables in the addon panel
5. Handles GraphQL requests and renders story only with successfully received data
6. Works fine with any GraphQL endpoint

## Related Addons

- [Storybook Addon GraphCMS](https://github.com/focusreactive/storybook-graphql-kit-graphcms) thin extension with GraphCMS features

## API

You need to pass options to addon. You can pass them directly as story parameters, with `withGraphQL` decorator or with `Query` helper.

```js

import { Query } from '../../addon/decorator'

export const pages = Query({ ...options });

```

### Common options for any GraphQL service:

`endpoint` - Your GraphQL project endpoint

`token` - GraphQL bearer token

`query` - your GraphQL query

`vars` - GraphQL variables

`searchVars` - GraphQL variables you will set in the addon panel

### Stories options

`name` - The name of the Story

`story` - Story functions (if you don't use Storybook origin syntax)

### Writing stories

When you writing stories with your own components you can access the raw query response alongside with parsed results:

```js

export const yourStory = ({ graphQlResponse }) => {
  // Result of your query. Usually what you want to use for components inside your App
  const data = graphQlResponse.result;
  // Array with information about fetched fields. The same that used for displaying default table
  const columns = graphQlResponse.columns;
  // Array of receiving objects. Works fine together with `columns` to output the parsed data
  const rows = graphQlResponse.rows;

  return data.map(props => <YouComponent {...props} />)
};
```

`graphQlResponse.columns` and `graphQlResponse.rows` are useful if you creating own tool to display your GraphQL data. Otherwise use `graphQlResponse.result`.


### Authoring Own Addons based on Storybook-GraphQL-Kit

You can use API to extend this addon with your own representations of receiving data.

```js
import { withGraphQL } from '@focus-reactive/storybook-graphql-kit';

const customRenderer = ({ key, value, ind, options }) => {
  if (key !== 'featured field') return null;

  return {
    id: key,
    getLabel: () => `${key}`,
    getValue: () => value,
    // return your custom React component or null for using `getValue`
    render: () => <CustomComponent/>,
  };
};

export const withYourServiceFeatures = withGraphQL
   .addRender(customRenderer)
   .addRender(customRenderer1)
   .addRender(customRenderer2);

```

See https://github.com/focusreactive/storybook-graphql-kit-graphcms as example of how to extend and create new addon

## Contributing

Any contribution are welcome to this project! Feel free to open an issue or start a PR.

To develop this project:

1. git clone
2. yarn
3. yarn start
4. open http://localhost:9009
5. the package code is located inside `addon` folder

## Credits

<div align="left" style="height: 16px;">Created with ❤︎ to <b>GraphQL</b> community by <a href="https://twitter.com/UsulPro">Oleg Proskurin</a> at <a href="https://twitter.com/FocusReactive">FocusReactive</a>
</div>

2019

[![FocusReactive](https://raw.githubusercontent.com/focusreactive/storybook-graphql-kit/master/docs/focusreactive-logo.svg?sanitize=true)](https://focusreactive.com)

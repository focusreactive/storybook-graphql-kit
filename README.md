# Storybook Addon GraphCMS

## Demo

See how we use it to extend GraphCMS UI for our content editors:

https://usulpro.github.io/storybook-addon-graphcms/

## Usage

```shell
yarn add --dev @focusreactive/storybook-addon-graphcms
```

```js
// addons.js

import "@focusreactive/storybook-addon-graphcms/register";
```

```js
// config.js or in your stories.js

import { withGraphCMS } from "../addon/decorator";

addDecorator(
  withGraphCMS({
    endpoint: CMS_ENDPOINT,
    token: CMS_TOKEN,
    projectId: "8be1ceff148c4b749e78b34007f9cc34",
    stage: "master",
  })
);

```


## API

```js

import { Query } from '../../addon/decorator'

export const pages = Query({ ...options });

```

Options can contain:

`query` - your GraphQL query

`vars` - GraphQL variables

`searchVars` - GraphQL variables you will set in the addon panel

`viewId` - The id of your system or custom view in GraphCMS UI

`name` - The name that will be passed to the Story

`endpoint` - Your GraphCMS project endpoint

`token` - GraphCMS token

`projectId` - your project id

`stage` - stage


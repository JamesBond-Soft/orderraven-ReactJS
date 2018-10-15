# Jason React Project with Isomorphic React Dashboard `Version 1.5`

### Please check `src/config.js` & edit as your app.

## Install Packages
```
yarn
```

## To create a production build
```
yarn build.
```

## Development

### How to run
```
yarn start
```

### Important
process all UI-logic **in render()**

## How to Add/Remove a Page/Route

- container
```
src/containers/{CUSTOM}/
```

- router
```
src/containers/App/AppRouter.js
src/containers/Sidebar/Sidebar.js
src/languageProvider/{en_US}.json
src/router.js
```

- redux
```
src/redux/{CUSTOM}/
src/redux/reducers.js
src/redux/sagas.js
```

- style
```
src/style/{CUSTOM}/
src/style/styles.less
src/style/UI-Component/tab/tab.css    // To change ant style in like this
                                      // import '../xx.css' in xx.js
src/style/table/antTable.less
```

## UI
https://ant.design/

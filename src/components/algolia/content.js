import React from 'react';
import { createConnector } from 'react-instantsearch';
import ContentElement from './contentElement';
import EmptyComponent from '../emptyComponent.js';

const CustomResults = createConnector({
  displayName: 'CustomResults',
  getProvidedProps(props, searchState, searchResults) {
    const status = searchResults.results
      ? searchResults.results.nbHits === 0
      : 'loading';
    return { query: searchState.query, status };
  }
})(({ status, query }) => {
  if (status === 'loading') {
    return (
      <div className="isoContentLoader">
        <div className="loaderElement" />
      </div>
    );
  } else if (status) {
    return <EmptyComponent value="No results for these filtering" />;
  } else {
    return <ContentElement />;
  }
});

export default CustomResults;

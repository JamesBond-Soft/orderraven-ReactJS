import React from 'react';

export default props => {
  return (
    <div>
      {props.title
        ? <h3 className="isoBoxTitle">
            {' '}{props.title}{' '}
          </h3>
        : ''}
      {props.subtitle
        ? <p className="isoBoxSubTitle">
            {' '}{props.subtitle}{' '}
          </p>
        : ''}
    </div>
  );
};

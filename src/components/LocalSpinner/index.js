
import React from 'react';
import Spinner from 'react-spinkit';

export default (props) => {
  if (props.loaded) return <div>{props.children}</div> || false;
  return (
    <div className="local-spinner__overlay">
      <Spinner name="ball-spin-fade-loader" />
    </div>
  );
};

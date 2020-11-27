import React from 'react';
import './CustomLoader.scss'
import {  Loader } from 'semantic-ui-react';

export const CustomLoader = () => {
  return (
    <div className="custom-loader">
      <Loader active content="Loading..." /> 
    </div>
  );
};
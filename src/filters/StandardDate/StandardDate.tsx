import React from 'react';
import Moment from 'react-moment';

type StandardDateProps = {
  date: any;
}

export const StandardDate: React.FC<StandardDateProps> = (props) =>
  <Moment format="DD/MM/YYYY">{props.date}</Moment>
import React from 'react';
import { Icon } from 'semantic-ui-react';
import './CustomError.scss';

type CustomErrorProps = {
  msg: string;
  alertStyled?: boolean;
};

export const CustomError: React.FC<CustomErrorProps> = (props) => {
  return (
    <>
      {props.alertStyled ? (
        <div className='custom-error alert'>
          <Icon name='times circle outline' />
          {props.msg}
        </div>
      ) : (
        <div className='custom-error'>
          {props.msg}
        </div>
      )}
    </>
  );
};

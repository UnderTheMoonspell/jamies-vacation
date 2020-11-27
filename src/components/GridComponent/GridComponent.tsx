import React from 'react';
import { Grid } from 'semantic-ui-react';

type GridComponentProps = {
  customClass?: string
}

export const GridComponent: React.FC<GridComponentProps> = (props) => (
  <Grid.Row>
    <Grid.Column className={props.customClass}>
      {props.children}
    </Grid.Column>
  </Grid.Row>
)
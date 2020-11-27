import React from 'react';
import { Grid } from 'semantic-ui-react';
import { CustomInput } from 'components/CustomInput/CustomInput';

export const LoginForm = () => {
  return (
    <form>
      <Grid >
        <CustomInput data-testid="email" label="Email" name="email" type="email" />
        <CustomInput data-testid="password" label="Password" name="password" type="password" />
      </Grid>
    </form>
  )
};

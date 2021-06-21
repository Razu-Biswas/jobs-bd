/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { infoContext } from '../../App';

function PrivateRoutes({ children, ...rest }) {
    const [info] = useContext(infoContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        // eslint-disable-next-line no-constant-condition
        info?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoutes;

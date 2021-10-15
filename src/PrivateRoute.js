import React from 'react';
import { Route, useHistory } from 'react-router-dom';

const PrivateRoute = ({ children, auth, SuccessComp, FailComp, ...rest }) => {
    const history = useHistory()
    return (
        <Route {...rest}
            render={() =>
                auth ? SuccessComp
                    : FailComp
            }
        />
    );
};

export default PrivateRoute;
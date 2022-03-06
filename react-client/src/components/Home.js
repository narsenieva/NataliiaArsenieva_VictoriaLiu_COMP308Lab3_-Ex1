
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{
    return (
        <div>
            <h2> Welcome</h2>
            <p>Sign in or create an account</p>
        </div>
    );

}

export default withRouter(Home);
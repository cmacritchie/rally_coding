import React from 'react';
import { defaultFieldResolver } from 'graphql';

export default ({ children }) => {
    return <div className="container">{children}</div>
}
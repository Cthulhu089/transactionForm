import React from 'react';

const Transaction = React.lazy(() => import('./views/Transaction/Transaction'));

const routes = [
    { path: '/Transaction', name: 'Transaction', component: Transaction },
];

export default routes;

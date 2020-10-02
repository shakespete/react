import { lazy } from 'react';

const routeList = [
  {
    key: '1',
    name: 'Home',
    path: '/home',
    Component: lazy(() => import('pages/home')),
    exact: true,
    roles: [],
  },
  {
    key: '2',
    name: 'Sites',
    path: '/management/sites',
    Component: lazy(() => import('pages/management/sites')),
    exact: true,
    roles: [],
  },
  {
    key: '3',
    name: 'Tenants',
    path: '/management/tenants',
    Component: lazy(() => import('pages/management/tenants')),
    exact: true,
    roles: ['get-tenant'],
  },
  {
    key: '4',
    name: 'Users',
    path: '/management/users',
    Component: lazy(() => import('pages/management/users')),
    exact: true,
    roles: [],
  },
  {
    key: '5',
    name: 'Manage Assets',
    path: '/assets',
    Component: lazy(() => import('pages/assets')),
    exact: true,
    roles: ['get-asset'],
  },
  {
    key: '6',
    name: 'Manage Locations',
    path: '/locations',
    Component: lazy(() => import('pages/locations')),
    exact: true,
    roles: [],
  },
  {
    key: '7',
    name: 'Manage Brands',
    path: '/brands',
    Component: lazy(() => import('pages/brands')),
    exact: true,
    roles: [],
  },
];

export default routeList;

import { lazy } from 'react';

const routeList = [
  {
    name: 'Home',
    path: '/home',
    Component: lazy(() => import('pages/home')),
    exact: true,
    roles: [],
  },
  {
    name: 'Sites',
    path: '/management/sites',
    Component: lazy(() => import('pages/management/sites')),
    exact: true,
    roles: [],
  },
  {
    name: 'Tenants',
    path: '/management/tenants',
    Component: lazy(() => import('pages/management/tenants')),
    exact: true,
    roles: ['get-tenant'],
  },
  {
    name: 'Users',
    path: '/management/users',
    Component: lazy(() => import('pages/management/users')),
    exact: true,
    roles: [],
  },
  {
    name: 'Manage Assets',
    path: '/assets',
    Component: lazy(() => import('pages/assets')),
    exact: true,
    roles: ['get-asset'],
  },
  {
    name: 'Manage Locations',
    path: '/locations',
    Component: lazy(() => import('pages/locations')),
    exact: true,
    roles: [],
  },
  {
    name: 'Manage Brands',
    path: '/brands',
    Component: lazy(() => import('pages/brands')),
    exact: true,
    roles: [],
  },
];

export default routeList;

import React, { lazy } from 'react';
import {
  AreaChartOutlined,
  HddOutlined,
  ReconciliationOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const subMenuList = [
  {
    key: 'dashboard',
    title: 'Dashboards',
    icon: <AreaChartOutlined />,
  },
  {
    key: 'admin',
    title: 'Admin',
    icon: <TeamOutlined />,
  },
  {
    key: 'assetsAndLocations',
    title: 'Assets and Location',
    icon: <HddOutlined />,
  },
  {
    key: 'inventory',
    title: 'Inventory',
    icon: <ReconciliationOutlined />,
  },
];

const routeList = [
  {
    name: 'Home',
    path: '/home',
    key: 'home',
    parent: 'dashboard',
    Component: lazy(() => import('pages/home')),
    exact: true,
    roles: [],
  },
  {
    name: 'Sites',
    path: '/management/sites',
    key: 'sites',
    parent: 'admin',
    Component: lazy(() => import('pages/management/sites')),
    exact: true,
    roles: [],
  },
  {
    name: 'Tenants',
    path: '/management/tenants',
    key: 'tenants',
    parent: 'admin',
    Component: lazy(() => import('pages/management/tenants')),
    exact: true,
    roles: ['get-tenant'],
  },
  {
    name: 'Users',
    path: '/management/users',
    key: 'users',
    parent: 'admin',
    Component: lazy(() => import('pages/management/users')),
    exact: true,
    roles: [],
  },
  {
    name: 'Manage Assets',
    path: '/assets',
    key: 'assets',
    parent: 'assetsAndLocations',
    Component: lazy(() => import('pages/assets')),
    exact: true,
    roles: ['get-asset'],
  },
  {
    name: 'Manage Locations',
    path: '/locations',
    key: 'locations',
    parent: 'assetsAndLocations',
    Component: lazy(() => import('pages/locations')),
    exact: true,
    roles: [],
  },
  {
    name: 'Manage Brands',
    path: '/brands',
    key: 'brands',
    parent: 'inventory',
    Component: lazy(() => import('pages/brands')),
    exact: true,
    roles: [],
  },
];

export { subMenuList };
export default routeList;

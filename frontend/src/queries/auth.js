import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
export const SITE = gql`
  query Site {
    site @client
  }
`;
export const TENANTS = gql`
  query Tenants {
    tenants @client
  }
`;

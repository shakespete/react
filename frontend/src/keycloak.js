import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const realm = localStorage.getItem('realm');
const keycloak = Keycloak({
  realm: 'Demo', // Pete: Fix this! Need to re-route to Login if no realm!
  url: `${process.env.REACT_APP_KEYCLOAK_HOST}:${process.env.REACT_APP_KEYCLOAK_PORT}/auth/`,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
});
console.log(keycloak);
export default keycloak;

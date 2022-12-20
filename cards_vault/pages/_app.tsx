import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import '../styles/globals.css'
import Keycloak from 'keycloak-js'
import Router  from 'next/router'

const keycloakConfig = {
  url: 'http://localhost:3030/api/auth',
  realm: 'Vault-Realm',
  clientId: 'vault-0098',
}

function App({ Component, pageProps }: AppProps) {
  const keycloak = new Keycloak(keycloakConfig)

  const keycloakInitOptions = { onLoad: 'check-sso', onAuthError: () => Router.push('/') }

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakInitOptions}
    >
      <Component {...pageProps} />
    </ReactKeycloakProvider>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
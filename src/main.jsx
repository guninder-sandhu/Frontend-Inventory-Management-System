import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Auth0Provider} from "@auth0/auth0-react";

const domainId="dev-tifsgpj0de6wps8x.au.auth0.com"
const clientId="jQB04rdOEVR6wLj4rNjERORqYkA4DSQh"
const audience = "https://ims-api";

createRoot(document.getElementById('root')).render(
  <Auth0Provider
      domain={domainId}
      clientId={clientId}
      authorizationParams={{
          redirect_uri: "http://localhost:5173/callback",
          audience: audience,
          scope: "openid profile email offline_access read: products"
      }}>
    <App />
     </Auth0Provider>
 ,
)

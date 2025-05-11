import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Auth0Provider} from "@auth0/auth0-react";

const domainId="dev-tifsgpj0de6wps8x.au.auth0.com"
const clientId="RGBhQ6wHQjRxbvc69KFHDEJ1UKxDxWTW"

createRoot(document.getElementById('root')).render(
  <Auth0Provider
      domain={domainId}
      clientId={clientId}
      redirectUri={window.location.origin}>
    <App />
     </Auth0Provider>
 ,
)

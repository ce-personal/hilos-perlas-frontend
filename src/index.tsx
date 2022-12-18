import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteView from "./routes/routes";
import "./index.scss"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render( <RouteView /> );

import React from 'react';
import App2 from './App2';
// import Stars from './stars';
import './App.css'
import Underlay from './Underlay';

import { createRoot } from 'react-dom/client';

  
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<>
                <App2 />
                <Underlay />
            </>);

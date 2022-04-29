import React from 'react';
import App2 from './App2';
// import Stars from './stars';
import './App.css'
import Underlay from './Underlay';

import { createRoot } from 'react-dom/client';

function Overlay() {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
        <a href="https://my.wbs.ac.uk/?event=login" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
          my.wbs
          <br />
          Warwick Business School
        </a>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate3d(-50%,-50%,0)' }}>
          <h1 style={{ margin: 0, padding: 0, fontSize: '3em', fontWeight: 500, letterSpacing: '-0.05em' }}>Porter's <p>Five </p>Forces</h1>
        </div>
        <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>proof of concept</div>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>29/04/2022</div>
      </div>
    )
  }


  
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<>
                <App2 />
                <Underlay />
            </>);

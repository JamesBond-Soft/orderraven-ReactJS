import React from 'react';
import { Link } from 'react-router-dom';
// import { siteConfig } from '../../config.js';

// export default function({ collapsed, styling }) {
export default function({ collapsed }) {
  return (
    <div
      className="isoLogoWrapper">
      {collapsed
        ? <div>
            <h3>
              <Link to="/dashboard">
                <img src="/favicon.png" alt="OR" style={{marginTop:18}} />
              </Link>
            </h3>
          </div>
        : <h3>
            <Link to="/dashboard">
              <img src="/images/ORDER-RAVEN-3-white.png" alt="RAVEN" height="60" style={{marginTop:5}} />
            </Link>
          </h3>}
    </div>
  );
}

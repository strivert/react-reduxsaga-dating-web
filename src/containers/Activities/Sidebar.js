import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="activities__aside">
    <ul className="settings__options">
      <li>
        <Link to="/apologetics">Apologetics</Link>
      </li>
      <li>
        <Link to="/apologetics/personality_test">Compatibility Test</Link>
      </li>
      <li>
        <Link to="#" onClick={()=>{
          let w=800;
          let h=600;
          if (window.screen) {
            w = window.screen.availWidth;
            h = window.screen.availHeight;
          }
          window.open('https://relevantradio.com/wp-content/media/rrplayer.php', 'sharer', `toolbar=0,status=0,width=${w},height=${h}`);
        }}>Relevant Radio</Link>
      </li>
    </ul>
  </div>
)

export default Sidebar

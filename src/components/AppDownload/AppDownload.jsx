import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'
function AppDownload() {
  return (
    <div>
         <div className="app-download" id="app-download">
            <p>For Better Experience Dowload<br></br>Tomoto App</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
         </div>
    </div>
  )
}

export default AppDownload
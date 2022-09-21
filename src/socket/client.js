// Client

import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const thisSessionId = Math.random().toString(36).substr(2, 9);

function Dashboard(props) {
  const elem = props.elem;
  const [uploadProgress, setUploadProgress] = useState({percentage: 0})

  useEffect(() => {
    const socket = io("http://localhost:8041/")
    socket.emit('connectInit', thisSessionId);
    socket.on("uploadProgress", (data) => {
      console.log("uploadProgress");
      setUploadProgress({percentage: data['percentage']}) // Data from progress added to state
    })
  }, [])

  return (
    <div>
      {uploadProgress ? (
        <div className="progressBar">
          <div
            className="progressBar__completed"
            style={{ width: `${uploadProgress.percentage}%` }}
          >
            <div className="progressBar__display">
              {uploadProgress.percentage !== 0 ? <em className="progressbar-display">&nbsp;</em> : null}
            </div>
          </div>
          <div className="progressBar__display">
            {uploadProgress.percentage === 0 ? <em className="progressbar-display">&nbsp;</em> : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Dashboard;
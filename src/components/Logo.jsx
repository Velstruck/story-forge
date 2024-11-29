import React from 'react'

function Logo({width="100px", className="", src="src/assets/story_forge.png"}) {
  return (
    <div>
      <img src={src} alt="my image" width={width} className={className} />
    </div>
  )
}

export default Logo
import React from 'react';

export default ({ id, title, src }) => {
  return (
    <div className="gif-box">
      <img
        className="gif-img"
        key={id}
        alt={title}
        src={src} />
    </div>
  )
};

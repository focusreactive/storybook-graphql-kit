import React from 'react';

const UserAvatar = ({ src, name, bio }) => (
  <div style={{ width: 200, display: 'flex', flexDirection: 'column', margin: 20 }}>
    <img src={src} alt={name} style={{ width: '100%' }} />
    <h3>{name}</h3>
    <p>{bio}</p>
  </div>
);

export default UserAvatar;

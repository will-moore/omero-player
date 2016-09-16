
import React from 'react';
import { Link } from 'react-router';

const ImageLink = ({ imageId, children }) => (
  <Link
    to={'/player/image/' + imageId + '/'}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </Link>
);

export default ImageLink

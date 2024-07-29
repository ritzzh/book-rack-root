
import React, { useEffect } from 'react';

const KeepAlive = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('http://book-rack-root-backend.onrender.com/api/ping') 
        .then(response => response.text())
        .then(data => console.log('Keep-alive ping successful'))
        .catch(err => console.error('Keep-alive request failed:', err));
    }, 5 * 60 * 1000); // Ping every 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default KeepAlive;

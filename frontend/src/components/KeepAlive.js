
import React, { useEffect } from 'react';

const KeepAlive = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('https://book-rack-root-backend.onrender.com/ping') 
        .then(response => response.text())
        .then(data => console.log('Keep-alive ping successful'))
        .catch(err => console.error('Keep-alive request failed:', err));
        console.log("Reload");
    }, 5 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default KeepAlive;

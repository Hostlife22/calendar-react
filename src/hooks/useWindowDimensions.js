import { useEffect, useState } from 'react';

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export const usePosition = () => {
  const [position, setPosition] = useState(null);
  const windowDimensions = useWindowDimensions();

  const getPosition = (clientX, clientY, size) => {
    const x =
      clientX + size.width <= windowDimensions.width
        ? clientX
        : clientX - size.width;
    const y =
      clientY + size.height <= windowDimensions.height
        ? clientY
        : clientY - size.height;

    setPosition({ top: `${y}px`, left: `${x}px` });
  };

  return [position, getPosition];
};

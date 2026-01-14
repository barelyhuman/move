import { useState, useEffect } from 'react';

/**
 * Custom hook for managing workout timer
 * @returns {Object} Timer state and controls
 */
export const useTimer = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startTime]);

  const start = () => {
    const now = Date.now();
    setStartTime(now);
    setElapsedTime(0);
  };

  const stop = () => {
    setStartTime(null);
    setElapsedTime(0);
  };

  const isActive = startTime !== null;

  return {
    elapsedTime,
    isActive,
    start,
    stop
  };
};


import {useCallback, useEffect, useState} from 'react';
import {AppState} from 'react-native';

const useAppUsage = () => {
  const [appState, setAppState] = useState<string>(AppState.currentState);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerIntervalMs: number = 1000;

  const handleAppStateChange = useCallback(
    (nextAppState: string) => {
      if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        // App goes to the background
        const currentTime = Date.now();
        const timeInBackground = currentTime - startTime;
        setElapsedTime(timeInBackground);
      } else if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App comes to the foreground
        setStartTime(Date.now() - elapsedTime);
      }
      setAppState(nextAppState);
    },
    [appState, elapsedTime, startTime],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [appState, elapsedTime, handleAppStateChange]);

  useEffect(() => {
    if (appState === 'active') {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const timeInBackground = currentTime - startTime;
        setElapsedTime(timeInBackground);
      }, timerIntervalMs);

      return () => {
        clearInterval(interval);
      };
    }
  }, [appState, startTime]);

  const formatTime = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds < 60) {
      return '<1m';
    } else {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    }
  };

  return formatTime(elapsedTime);
};

export default useAppUsage;

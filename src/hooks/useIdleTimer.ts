import { useRef, useEffect, useState } from "react";
import { AppState, PanResponder } from "react-native";

const useIdleTimer = (onIdle: () => void, timeout = 10000) => {
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const [isIdle, setIsIdle] = useState(false);

  const resetTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setIsIdle(false);
    timerId.current = setTimeout(() => {
      onIdle();
      setIsIdle(true);
    }, timeout);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      resetTimer();
      return false;
    },
    onMoveShouldSetPanResponder: () => {
      resetTimer();
      return false;
    },
    onStartShouldSetPanResponderCapture: () => {
      resetTimer();
      return false;
    },
  });

  useEffect(() => {
    resetTimer();

    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === "background") {
        onIdle();
        setIsIdle(true);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      subscription.remove();
    };
  }, [onIdle]);

  return { panResponder, isIdle, setIsIdle };
};

export default useIdleTimer;

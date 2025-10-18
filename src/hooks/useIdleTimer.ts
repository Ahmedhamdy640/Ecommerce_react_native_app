import { useRef, useEffect } from "react";
import { AppState, PanResponder } from "react-native";
import { useDispatch } from "react-redux";
import { lockApp } from "../store/lockSlice";

const useIdleTimer = (timeout = 10000) => {
  const dispatch = useDispatch();
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      dispatch(lockApp());
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
        dispatch(lockApp());
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
  }, [dispatch]);

  return panResponder;
};

export default useIdleTimer;

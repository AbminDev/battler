import { BrowserRouter } from "react-router-dom";
import { openWebSocket } from "../../Websocket/websocketInit";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedRoutes } from "./components";
import {useSoundService} from "../../utils/soundService";

export const Router = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ws = useSelector((state: RootState) => state.webSocket?.webSocket);
  const { pausedSounds, pausedMusic } = useSoundService();

  useEffect(() => {
    console.log("before open WS");
    dispatch(openWebSocket());
  }, [dispatch]);

  useEffect(() => {

  }, [ws]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        pausedSounds();
        pausedMusic();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // console.log('WS', ws);
  return <BrowserRouter>{ws?.readyState && <AnimatedRoutes />}</BrowserRouter>;
};

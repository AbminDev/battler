import React, { useEffect } from "react";
import "../../App.css";
import { Router } from "../Router";
import {Provider, useDispatch, useSelector} from "react-redux";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import {AppDispatch, RootState, store} from "../../app/store";
import { openWebSocket } from "../../Websocket/websocketInit";
import { useTelegram } from "../../hooks/useTelegram";
import {Preloader} from "../../layout/components/Preloader";
import ReactGA from 'react-ga4';
import { setUserId } from "../../app/features/userIdSlice";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';
import {APP_ENV} from "../../config";

export const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [orientation, setOrientation] = React.useState('');
  const [orientationScale, setOrientationScale] = React.useState(1);
  const [renderKey, setRenderKey] = React.useState(0);
  sessionStorage.setItem('hasInteracted', 'false'); // for play sounds

  if (APP_ENV === 'production') {
    ReactGA.initialize('G-NX7X1LGVEZ');
  }

  useEffect(() => {
    openWebSocket();
  }, []);

  const {tg, userId} = useTelegram();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && APP_ENV && ['production', 'stage'].includes(APP_ENV)) {
        setRenderKey(prevKey => prevKey + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      store.dispatch(setUserId(userId));
      if (APP_ENV === 'production') {
        amplitude.init('a8b624aadbb127ce1c4bea6f0bdcb1a8');
        const sessionReplayTracking = sessionReplayPlugin({
          sampleRate: undefined
        });
        amplitude.add(sessionReplayTracking);
      }
      setLoading(false);
    }, 1500);
  }, [tg]);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.screen.orientation.type.includes('portrait');
      setOrientation(isPortrait ? 'portrait' : 'landscape');
      setOrientationScale(isPortrait ? 1 : +(window.innerHeight / window.innerWidth).toFixed(2));
      if (APP_ENV && ['production', 'stage'].includes(APP_ENV)) {
        setRenderKey(prevKey => prevKey + 1);
      }
    };

    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const userAgent = navigator.userAgent.toLowerCase();
  const desktopOnly = !/mobile|android|iphone|ipad|phone/.test(userAgent) && APP_ENV === 'production';

  return (
    <>
      <Provider store={store} key={renderKey}>
        <TonConnectUIProvider manifestUrl="https://tgbets-de02f.web.app/manifest.json">
          <div className="App">
            <Router />
            <Preloader loading={loading}/>
          </div>
        </TonConnectUIProvider>
      </Provider>
      {orientation === 'landscape' && (
        <div className="absolute flex justify-center items-center w-full h-full bg-[#000000] z-[9999]">
          <img src={require(`../../assets/images/rotate-example.jpg`)} className="w-full max-w-[250px] h-auto" alt=""/>
        </div>
      )}
      {desktopOnly && (
        <div className="absolute flex justify-center items-center w-full h-full bg-[#201a1a] z-[9999]">
          <img src={require(`../../assets/images/pc-only.jpg`)} className="w-full max-w-[480px] h-auto" alt=""/>
        </div>
      )}
    </>
  );
};

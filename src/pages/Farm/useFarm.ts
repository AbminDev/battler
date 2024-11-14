// useFarm.ts
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useTelegram } from "../../hooks/useTelegram";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { fetchIslands } from "../../app/features/islandsSlice";


export function useFarm() {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const { tg, userId } = useTelegram();
  const dispatch = useDispatch<AppDispatch>();

  const islands = useSelector((state: RootState) => state.islands.islands);
  const islandsStatus = useSelector((state: RootState) => state.islands.status);

  useEffect(() => {
    if (tg) {
      tg.setHeaderColor("#1f1c1a");
    }
  }, [tg]);

  useEffect(() => {
    if (userId && islandsStatus === 'idle') {
      dispatch(fetchIslands(`${userId}`));
    }
  }, []);

  return {
    islands,
    transformComponentRef,
    islandsStatus,
  };
}

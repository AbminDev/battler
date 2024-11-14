import { useEffect, useState } from "react";
import { Island, IslandProps } from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useUtils } from "../../../utils/navigateTo";
import { setSelectedIsland } from "../../../app/features/selectedIsland";
import { useTelegram } from "../../../hooks/useTelegram";
import { getIslands } from "../../../endpoints/farmMock";
import { setFarmSave } from "../../../app/features/farmTutoralSlice";
import { TutorialFarmStage } from "../../../interfaces/tutorial";
import { useFarm } from "../../../pages/Farm/useFarm";

export function useIsland(props: IslandProps) {
  const { island, zoomRef } = props;
  const [transition, setTransition] = useState(false);

  const { navigateTo } = useUtils();
  const dispatch = useDispatch();

  const { tg, userId } = useTelegram();

  // useEffect(() => {
  //   const fetchIslands = async () => {
  //     if (userId) {
  //       await getIslands({ clientId: `${userId}` });
  //     }
  //   };

  //   fetchIslands();
  // }, []);

  const { islands } = useFarm();
  
  // get all islands from redux
  // const islands = useSelector((state: RootState) => state.islands.islands);

  // zoom to selected island and navigate to it
  const onClickNavigate = () => {
    dispatch(
      setSelectedIsland({ island: islands.find((v) => v.id === island.id)! })
    );

    console.log(island.id);
    if (zoomRef && zoomRef.current) {
      setTransition(true);
      const { zoomToElement, zoomOut } = zoomRef.current;
      zoomToElement("room_" + island.id, 7, 3000, "easeOut");
      setTimeout(() => {
        navigateTo("/island");
        zoomOut();
        setTransition(false);
      }, 2000);
    } else {
      navigateTo("/island");
    }
  };

  return {
    onClickNavigate,
    transition,
    islands,
    island,
  };
}

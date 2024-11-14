import React from "react";
import { Header } from "../Header";
import { HeaderCave } from "../HeaderCave";
import { HeaderFarm } from "../HeaderFarm";
import { HeaderRoom } from "../HeaderRoom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useSessionStorage } from "@uidotdev/usehooks";
import { islandsConfigMock } from "../../../mock/buildings";

export const HeaderSelector = ({ currentPage }: { currentPage: string }) => {




  const farmTutorialSave = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save
  );

  const [triggerCloseHeader, settriggerCloseHeader] = useSessionStorage(
    "buildingLevelUp",
    false
  );

  const [startSelectHero, setStartSelectHero] = useSessionStorage(
    "startSelectHero",
    false
  );

  const [isDungeonStart, setIsDungeonStart] = useSessionStorage(
    "isDungeonStart",
    false
  );

  switch (currentPage) {
    case "/":
      return <HeaderFarm />;
    case "/play":
      return <HeaderCave gold={0} />;
    case "/room":
      return <HeaderFarm />;
    case "/island":
      if (startSelectHero) {
        return null;
      }
      if(isDungeonStart) {
        return null
      }
      return farmTutorialSave?.stage && farmTutorialSave?.stage >= 1 && !triggerCloseHeader ? (
        <HeaderFarm />
      ) : null;
    default:
      return null;
  }
};

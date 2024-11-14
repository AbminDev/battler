import { FooterCave } from "../FooterCave";
import { FooterFarm } from "../FooterFarm";
import { BuildFooter } from "../../../containers/Farm";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useSessionStorage } from "@uidotdev/usehooks";

export const FooterSelector = ({ currentPage }: { currentPage: string }) => {
  const selectedRoom = useSelector((state: RootState) => state.selectedRoom);


  const [startSelectHero, setStartSelectHero] = useSessionStorage(
    "startSelectHero",
    false
  );

  const [isDungeonStart, setIsDungeonStart] = useSessionStorage(
    "isDungeonStart",
    false
  );

  const farmTutorialSave = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save
  );

  const [triggerShowLevelUp, setTriggerShowLevelUp] = useSessionStorage(
    "buildingLevelUp",
    false
  );

  // console.log("farmTutorialSave", farmTutorialSave);
  switch (currentPage) {
    case "/":
      return <FooterFarm />;
    case "/island":
      if (isDungeonStart) {
        return null;
      }
      if (startSelectHero) {
        return null;
      }
      return !triggerShowLevelUp ? (
        <FooterFarm tutorialSave={farmTutorialSave} />
      ) : null;

    case "/play":
      return (
        <FooterCave
          currentHpAmount={20}
          currentManaAmount={2}
          hpAmount={20}
          manaAmount={2}
          cardsAtDeck={[]}
        />
      );
    case "/room":
      return null;
    case "/tutorial":
      return null;
    // case "/battle":
    //   return <> ;
    default:
      return null;
  }
};

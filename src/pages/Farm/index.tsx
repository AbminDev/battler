import { useFarm } from "./useFarm";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { RenderIslands } from "../../containers/Farm/RenderIslands";
import { useUtils } from "../../utils/navigateTo";
import { islandsConfigMock } from "../../mock/buildings";
import PageTransition from "../../containers/Router/components/PageTransition";
import { TutorialSave, TutorialStage } from "../../interfaces/tutorial";
import { useDispatch } from "react-redux";
import { setSave } from "../../app/features/tutorialSaveSlice";
import { updateTutorialProgress } from "../../endpoints/tutorialProgress";
import { useTelegram } from "../../hooks/useTelegram";
import { useEffect } from "react";
import { getFarmConfig } from "../../endpoints/configEndpoint";
import { fetchConfig } from "../../app/features/configSlice";
import { AppDispatch } from "../../app/store";

export const Farm = () => {
  const { transformComponentRef } = useFarm();

  const { navigateTo } = useUtils();

  const dispatch = useDispatch<AppDispatch>();

  const { userId } = useTelegram();

  const updateSave = ({ save }: { save: TutorialSave }) => {
    // const save = { stage: TutorialStage.stone }
    dispatch(setSave(save));
    const updatingSave = async () => {
      await updateTutorialProgress({
        clientId: userId,
        save: JSON.stringify(save),
      });
    };
    updatingSave();
  };

  const handleStart = () => {
    updateSave({ save: { stage: TutorialStage.start } });
    navigateTo("/tutorial");
  };

  useEffect(() => {
    console.log("fetchConfig 2")
    dispatch(fetchConfig());
  }, [dispatch]);
  

  return (
    <PageTransition>
      <TransformWrapper disabled={true} ref={transformComponentRef}>
        <button
          className="fixed top-[15%] right-4 z-10"
          onClick={() => handleStart()}
        >
          <img src={require("../../assets/images/home_ico.png")} />
        </button>
        <TransformComponent
          wrapperStyle={{
            minWidth: "100%",
            minHeight: "100%",
            flexDirection: "column",
            display: "grid",
            position: "absolute",
            alignItems: "end",
          }}
          contentStyle={{
            minHeight: "100%",
            width: "100%",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <main
            className={`w-full min-h-full
                        bg-[url('assets/images/islandsBg.png')] bg-no-repeat bg-cover
                        left-0 top-0 flex flex-col justify-end overflow-hidden`}
          >
            <div className="min-w-full min-h-full h-full w-full bg-black bg-opacity-50">
              <div className="w-full flex flex-col justify-end h-full">
                <div className="w-full flex flex-col px-4 h-full">
                  <RenderIslands
                    islands={islandsConfigMock}
                    zoomRef={transformComponentRef}
                  />
                </div>
              </div>
            </div>
            <div
              id="bottomDiv"
              className="absolute bottom-[32px] right-0 w-[10px] h-[10px]"
            />
          </main>
        </TransformComponent>
      </TransformWrapper>
    </PageTransition>
  );
};

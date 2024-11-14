import React from "react";
import { tutorialStyles } from "./TutorialStyle";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useTutorial } from "./useTutorial";
import { useTranslation } from "react-i18next";
import useFitText from "use-fit-text";
import { Outlet, useLocation } from "react-router-dom";
import PageTransition from "../../containers/Router/components/PageTransition";
import { useDispatch } from "react-redux";
import { setSave } from "../../app/features/tutorialSaveSlice";
import { updateTutorialProgress } from "../../endpoints/tutorialProgress";
import { useTelegram } from "../../hooks/useTelegram";
import { TutorialSave, TutorialStage } from "../../interfaces/tutorial";
import FarmEffect from "../../containers/Router/components/FarmEffect";
import {PopupButton} from "../../components/PopupButton";
import {APP_ENV} from "../../config";

export const Tutorial = () => {
  const { t } = useTranslation();
  const { fontSize, ref } = useFitText({ maxFontSize: 220 });

  const {
    stage,
    getBackgroundOpacity,
    getNegativeOpacity,
    counter,
    maxCounter,
    isClicked,
    navigateTo,
    handleButtonClick,
    handleTouchStart,
    animDir,
    showImage,
    clicks,
    cards,
    handleBack,
  } = useTutorial();

  const location = useLocation();

  const PAGES = ["/tutorial/dialogue", "/tutorial/dungeon"];

  const isCurrentPageInArray = PAGES.some((page) =>
    location.pathname.includes(page)
  );

  const { userId } = useTelegram();
  const dispatch = useDispatch();
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

  return (
    <PageTransition>
      {!isCurrentPageInArray && (
        <div>
          <div className="no-scroll overflow-hidden left-0 w-full h-full select-none">
            <div style={tutorialStyles.TutorialContainer} className="relative">
              {["start", "stone", "stone2", "torch"].includes(stage) && (
                <div>
                  {stage === "torch" && (
                    <div>
                      <div
                        className="h-full w-full absolute bg-[url('./assets/images/cave-2.jpg')] bg-no-repeat bg-center bg-cover"
                        style={{ opacity: getBackgroundOpacity(counter) }}
                      ></div>
                      <div className="h-full w-full absolute bg-gradient-to-b from-[#000] from-60% to-transparent"></div>
                      {/*<img*/}
                      {/*  src={require("../../assets/images/skeleton-eyes.png")}*/}
                      {/*  className="absolute top-[30%] ml-[12px]"*/}
                      {/*  style={{ opacity: getBackgroundOpacity(counter), width: "138px" }}*/}
                      {/*  alt=""*/}
                      {/*/>*/}
                    </div>
                  )}
                  <div className="absolute flex items-center justify-center h-full w-full">
                    <div>
                      <div
                        className="absolute top-8 text-white w-4/5 inset-x-0 m-auto text-center bg-yellow-950 h-5
                    text-xl rounded leading-3 border border-amber-300"
                      >
                        <div
                          className="absolute h-full bg-lime-400 ease-linear duration-300"
                          style={{ width: (counter / maxCounter) * 100 + "%" }}
                        ></div>
                        <div
                          className="absolute w-full text-center select-none"
                          style={{ WebkitTextStroke: "1px black" }}
                        >
                          {counter}/{maxCounter}
                        </div>
                      </div>
                      {counter !== maxCounter && (
                        <button
                          id="btn"
                          className={`p-4 w-[250px] h-[250px] bg-[url('./assets/images/button.png')] bg-no-repeat bg-center rounded-[110px]
                    bg-contain text-[11.5vw] uppercase text-[#814D3C] leading-tight transition-transform transform break-normal ${
                      isClicked ? `${animDir}` : ""
                    }`}
                          style={{ WebkitTextStroke: "1px black", fontSize }}
                          onTouchStart={handleTouchStart}
                          onClick={(e) => handleButtonClick(e)}
                        >
                          {["start", "stone", "stone2"].includes(stage) &&
                            t("tutorial.btn1")}
                          {["amulet"].includes(stage) && t("tutorial.btn4")}
                          {["torch"].includes(stage) && t("tutorial.btn2")}
                          {clicks.length > 0 &&
                            clicks.map(
                              (click) =>
                                click.id &&
                                click.x !== undefined &&
                                click.y !== undefined && (
                                  <span
                                    key={click.id}
                                    className="absolute text-[#814d3c] text-3xl"
                                    style={{
                                      animation: "fadeOutUp .7s forwards",
                                      left: `${click.x}px`,
                                      top: `${click.y}px`,
                                    }}
                                  >
                                    +1
                                  </span>
                                )
                            )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {["start", "stone"].includes(stage) && showImage && (
                <div className="absolute flex items-center justify-center h-full w-full z-50">
                  <div className="absolute top-0 flex items-center justify-center h-full w-full bg-[#0a0a0a]"></div>
                  <img
                    className="absolute z-10 animate-spin"
                    style={{ animationDuration: "3s" }}
                    src={require("../../assets/images/glow.png")}
                    alt=""
                  />
                  <img
                    className="z-20 w-40"
                    src={require("../../assets/images/stone.png")}
                    alt=""
                  />
                  <div className="absolute top-12 text-2xl text-white text-center">
                    {t("tutorial.gotItem")}
                  </div>
                  <div className="absolute bottom-12 text-3xl text-white text-center">
                    {t("tutorial.item1")}
                  </div>
                </div>
              )}
              {["stone2"].includes(stage) && showImage && (
                <div className="absolute flex items-center justify-center h-full w-full z-50">
                  <div className="absolute top-0 flex items-center justify-center h-full w-full bg-[#0a0a0a]"></div>
                  <img
                    className="absolute z-10 animate-spin"
                    style={{ animationDuration: "3s" }}
                    src={require("../../assets/images/glow.png")}
                    alt=""
                  />
                  <img
                    className="z-20 w-40"
                    src={require("../../assets/images/torch.png")}
                    alt=""
                  />
                  <div className="absolute top-12 text-2xl text-white text-center">
                    {t("tutorial.gotItem")}
                  </div>
                  <div className="absolute bottom-12 text-3xl text-white text-center">
                    {t("tutorial.item2")}
                  </div>
                </div>
              )}
              {["torch"].includes(stage) && showImage && (
                <div className="absolute flex items-center justify-center h-full w-full z-50">
                  <div className="absolute top-0 flex items-center justify-center h-full w-full bg-[#0a0a0a]"></div>
                  <img
                    className="absolute z-10 animate-spin"
                    style={{ animationDuration: "3s" }}
                    src={require("../../assets/images/glow.png")}
                    alt=""
                  />
                  <img
                    className="z-20 w-40"
                    src={require("../../assets/images/fire.png")}
                    alt=""
                  />
                  <div className="absolute top-12 text-2xl text-white text-center">
                    {t("tutorial.gotItem")}
                  </div>
                  <div className="absolute bottom-12 text-3xl text-white text-center">
                    {t("tutorial.item3")}
                  </div>
                </div>
              )}
              {["fire"].includes(stage) && (
                <div className="absolute flex items-center justify-center h-full w-full">
                  <div className="h-full w-full absolute bg-[url('./assets/images/cave-2.jpg')] bg-no-repeat bg-center bg-cover"></div>
                  <img
                    className="absolute top-[30%] ml-[12px]"
                    src={require("../../assets/images/skeleton.png")}
                    style={{ width: "138px" }}
                    alt=""
                  />
                  <div
                    className="h-full w-full absolute bg-gradient-to-b from-[#000] from-60% to-transparent"
                    style={{ opacity: getNegativeOpacity(counter) }}
                  ></div>
                  {/*<div*/}
                  {/*  className="absolute top-8 text-white w-4/5 inset-x-0 z-10 m-auto text-center bg-yellow-950 h-5 text-xl*/}
                  {/*rounded leading-3 border border-amber-300"*/}
                  {/*>*/}
                  {/*  <div*/}
                  {/*    className="absolute h-full bg-lime-400 ease-linear duration-300"*/}
                  {/*    style={{ width: (counter / maxCounter) * 100 + "%" }}*/}
                  {/*  ></div>*/}
                  {/*  <div*/}
                  {/*    className="absolute w-full text-center"*/}
                  {/*    style={{ WebkitTextStroke: "1px black" }}*/}
                  {/*  >*/}
                  {/*    {counter}/{maxCounter}*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  <img
                    src={require("../../assets/images/skeleton-eyes.png")}
                    className="absolute top-[30%] ml-[12px]"
                    style={{
                      opacity: getNegativeOpacity(counter),
                      width: "138px",
                    }}
                    alt=""
                  />
                  {counter <= 5 && (
                    <div>
                      <img
                        src={require("../../assets/images/dialog-cloud.png")}
                        className="absolute top-[15%] right-5"
                        style={{ width: "220px" }}
                        alt=""
                      />
                      <div
                        className="absolute flex items-center justify-center z-10 right-5 text-center top-[15%]"
                        style={{ width: "220px", height: "110px" }}
                      >
                        <p className="w-full px-[25px] text-wrap">
                          {t("tutorial.enemyLines")}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="absolute flex items-center justify-center h-full w-full">
                    {counter !== maxCounter && (
                      <button
                        className={`p-4 w-[250px] h-[250px] bg-[url('./assets/images/button.png')] bg-no-repeat bg-center rounded-[110px]
                    bg-contain text-5xl uppercase text-[#814D3C] leading-tight transition-transform transform mt-[80px]
                    ${isClicked ? `${animDir}` : ""}`}
                        style={{ WebkitTextStroke: "1px black", fontSize }}
                        onClick={(e) => handleButtonClick(e)}
                        onTouchStart={handleTouchStart}
                      >
                        {t("tutorial.btn3")}
                        {clicks.length > 0 &&
                          clicks.map(
                            (click) =>
                              click.id &&
                              click.x !== undefined &&
                              click.y !== undefined && (
                                <span
                                  key={click.id}
                                  className="absolute text-[#814d3c] text-3xl animate-fadeOutUp"
                                  style={{
                                    left: `${click.x}px`,
                                    top: `${click.y}px`,
                                  }}
                                >
                                  +1
                                </span>
                              )
                          )}
                      </button>
                    )}
                  </div>
                </div>
              )}
              {["start", "stone", "stone2", "torch", "fire"].includes(
                stage
              ) && (
                <div className="absolute left-8 bottom-8 flex">
                  {cards &&
                    cards.map((card, index) => (
                      <div className="relative w-14 mr-2" key={index} style={{
                        marginLeft: index !== 0 && card.title === cards[index-1].title ? '-50px' : '',
                      }}>
                        {card.image === 'stone' ? (
                          <img
                            className="relative w-full h-full"
                            src={require("../../assets/images/cards/Stone-1Star.png")}
                            alt=""
                          />
                          ) : (
                          <>
                            <img
                              className="relative w-full h-full"
                              src={require("../../assets/images/mini-card.png")}
                              alt=""
                            />
                            <div className="absolute w-full h-full top-0 text-center">
                              <img
                                className="relative mx-auto top-3 w-10"
                                src={require("../../assets/images/" +
                                card.image +
                                ".png")}
                                alt=""/>
                              <div className="absolute text-xs text-white h-5 bottom-0 w-full text-center">
                                {card.title}
                              </div>
                            </div>
                          </>
                          )}
                      </div>
                    ))}
                </div>
              )}
              {["amulet"].includes(stage) && (
                <div className="absolute flex items-center justify-center h-full w-full">
                  <div className="h-full w-full absolute bg-[#0c0c0c] bg-no-repeat bg-center bg-cover"></div>
                  {/*<div className="absolute top-8 text-white w-4/5 inset-x-0 m-auto text-center bg-yellow-950 h-5 text-xl rounded leading-3 border border-amber-300">*/}
                  {/*  <div*/}
                  {/*    className="absolute h-full bg-lime-400 ease-linear duration-300"*/}
                  {/*    style={{ width: (counter / maxCounter) * 100 + "%" }}*/}
                  {/*  ></div>*/}
                  {/*  <div*/}
                  {/*    className="absolute w-full text-center select-none"*/}
                  {/*    style={{ WebkitTextStroke: "1px black" }}*/}
                  {/*  >*/}
                  {/*    {counter}/{maxCounter}*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  <button
                    className={`absolute w-[300px] h-[300px] transition-transform transform rounded-[110px] overflow-hidden amulet-appear ${
                      isClicked && animDir
                    }`}
                    onClick={(e) => handleButtonClick(e)}
                    onTouchStart={handleTouchStart}
                  >
                    <img
                      className="w-full h-auto"
                      src={require("../../assets/images/amulet.png")}
                      alt=""
                    />
                    {clicks.length > 0 &&
                      clicks.map(
                        (click) =>
                          click.id &&
                          click.x !== undefined &&
                          click.y !== undefined && (
                            <span
                              key={click.id}
                              className="absolute text-[#fff] text-3xl animate-fadeOutUp"
                              style={{
                                left: `${click.x}px`,
                                top: `${click.y}px`,
                              }}
                            >
                              +1
                            </span>
                          )
                      )}
                  </button>
                </div>
              )}

              {["battle"].includes(stage) && (
                <div className="absolute flex items-center justify-center h-full w-full">
                  <div className="h-full w-full absolute bg-[url('./assets/images/cave-2.jpg')] bg-no-repeat bg-center bg-cover"></div>
                  <img
                    className="absolute top-[30%] ml-[12px]"
                    src={require("../../assets/images/skeleton.png")}
                    style={{ width: "138px" }}
                    alt=""
                  />
                </div>
              )}
              {/* <button
                className="absolute z-20 right-2 bottom-2"
                onClick={() => navigateTo("/")}
                title="Go to Home"
              >
                <img src={require("../../assets/images/home_ico.png")} alt="" />
              </button> */}
            </div>
          </div>
        </div>
      )}
      {isCurrentPageInArray && <Outlet />}
    </PageTransition>
  );
};

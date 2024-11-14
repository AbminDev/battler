import React, { useState, useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { Slider } from "../../containers";
import { LargeButton } from "../../components/LargeButton";
import { Background } from "../../layout/components/Background";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { tab } from "@testing-library/user-event/dist/tab";
import { Link, useNavigate } from "react-router-dom";
import { useUtils } from "../../utils/navigateTo";

export const Home = () => {
  const { navigateTo } = useUtils();
  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [initialStep, setInitialStep] = useState(0);
  const [activeDiv, setActiveDiv] = useSessionStorage("page", "/");
  const [intro, setIntro] = useState<any>();
  const introJsOptions = {
    steps: [
      {
        element: "#step1",
        intro: "This is the first step",
      },
      {
        element: "#step2",
        intro: "This is the second step",
      },
    ],
    showStepNumbers: false,
    exitOnOverlayClick: false,
  };
  const steps = [
    {
      element: ".hero-card",
      intro: "This is hero",
    },
    {
      element: ".home-play-btn",
      intro: "This is text",
    },
  ];

  useEffect(() => {
    setStepsEnabled(true);
  }, []);

  useEffect(() => {
    navigateTo(activeDiv);
  }, []);

  useEffect(() => {
    //console.log("!!!!!!!!!!!!");
    // handleSvgClick('/tutorial');
    //navigateTo('/tutorial');
    const intro = introJs();
    setIntro(intro);
    intro.setOptions({
      steps: [
        {
          element: ".home-play-btn",
          intro: "This is the first step",
        },
        {
          element: "#step2",
          intro: "This is the second step",
        },
      ],
      showButtons: false,
      showStepNumbers: false,
      disableInteraction: false,
      exitOnOverlayClick: false, // Disable closing the tour when clicking on the overlay
    });

    // intro.start();

    return () => {
      intro.exit(true); // Clean up on component unmount
    };
  }, []);

  // useEffect(() => {
  //   if (intro) {
  //     intro.start()
  //   }
  // }, [intro]);

  // const handleSvgClick = (divLink: string) => {
  //   dispatch(setCurrentPage(divLink));
  // };

  return (
    <>
      <Background>
        <button
          className="absolute z-20 right-2 bottom-[200px]"
          onClick={() => navigateTo("/tutorial")}
          title="Go to Tutorial"
        >
          <img src={require("../../assets/images/lock.png")} alt="" />
        </button>
        {/*<IntroJs*/}
        {/*  enabled={true}*/}
        {/*  options={introJsOptions}*/}
        {/*  onExit={() => console.log('ffffff')}*/}
        {/*/>*/}
        {/*<Steps*/}
        {/*  enabled={stepsEnabled}*/}
        {/*  steps={steps}*/}
        {/*  initialStep={initialStep}*/}
        {/*  onExit={() => setStepsEnabled(false)}*/}
        {/*/>*/}
        <div>
          {/*<button onClick={() => introJs().start()}>Start Tour</button>*/}
          {/* <div id="step1" onClick={handleStep1Click}>Step 1 content</div>
          <div id="step2">Step 2 content</div> */}
        </div>
        <div className="pt-[80px] flex-row flex items-center justify-center gap-3 h-[20%] flex-1">
          <div className="lobby-image">
            <img src={require("../../assets/images/lobby_ico.png")} />
          </div>
          <p className="text-[40px] text-white font-black drop-shadow-[2px_2px_0px_#18191A]">
            330 000
          </p>
        </div>
        <div className="items-center justify-center flex flex-col h-[80%] max-h-[450px]">
          <div className="flex flex-col flex-1 w-full h-full max-h-[90%] hero-card">
            <Slider />
            <div className="mt-6 flex flex-col items-center">
              <Link to="/play">
                <div className="d-table home-play-btn">
                  <LargeButton
                    onClick={() => navigateTo("/play")}
                    title="PLAY"
                    width={180}
                    height={
                      document.documentElement.clientHeight <= 600 ? 50 : 72
                    }
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Background>
      <button
        className="absolute z-20 right-2 bottom-2"
        onClick={() => navigateTo("/tutorial")}
        title="Go to Tutorial"
      >
        <img src={require("../../assets/images/lock.png")} alt="" />
      </button>
      <button
        className="absolute z-20 left-2 bottom-2"
        onClick={() => navigateTo("/")}
        title="Go to Farm"
      >
        <img
          src={require("../../assets/images/stone.png")}
          width={50}
          height={50}
        />
      </button>
    </>
  );
};

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Claim } from "../../containers";
import { Background } from "../../layout/components/Background";
import { ClaimCard } from "../../containers/Claim/components/ClaimCard";
import { useScroll } from "../../utils/ScrollContext";
import PageTransition from "../../containers/Router/components/PageTransition";

export const Rewards = () => {
  const { setScrollable } = useScroll();
  const scrollableElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollable(true, scrollableElRef);

    return () => {
      setScrollable(false);
    };
  }, [setScrollable]);

  const { t } = useTranslation();
  return (
    <>
      <PageTransition>
        <Background>
          <div
            ref={scrollableElRef}
            className="scrollable-element gap-2 flex flex-col"
            style={{ overflowY: "auto", height: "calc(100vh - 120px)" }}
          >
            <Claim />
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />{" "}
            <ClaimCard
              textKeyTitle="rewards.titles.friends3"
              value={3000}
              imgName="reward_mock"
            />
          </div>
        </Background>
      </PageTransition>
    </>
  );
};

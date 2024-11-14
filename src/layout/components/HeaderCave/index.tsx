import React, { useEffect, useState } from "react";
import { CoinsBalance, HandleBackButton, KeysBalance, PageName } from "./components";
import { useUtils } from "../../../utils/navigateTo";
import { useSoundService } from "../../../utils/soundService";
import { CardProps } from "../../../interfaces/card";
import { CardsModal } from "../../../pages/Battle/CardsModal";
import { ItemCard } from "../FooterCave/components";
import { useTranslation } from "react-i18next";

export let tutorial: boolean;
export let pageName: string;
export let remainingPages: number;

export const HeaderCave: React.FC<{
  tutorial?: boolean;
  pageName?: string;
  remainingPages?: number;
  gold?: number;
  onClick?: () => void;
  cards?: CardProps[];
  keys?: number;
}> = ({
  tutorial = false,
  pageName = "I: Border Village",
  remainingPages = 0,
  gold = 0,
  onClick,
  cards,
  keys,
}) => {
  const { navigateTo } = useUtils();
  const { t } = useTranslation();
  const { playSound } = useSoundService();
  // console.log("cards", cards);
  const [isDeckOpen, setIsDeckOpen] = useState(false);

  const transformCards = (cards: any[]): CardProps[] => {
    return cards
      .filter((card) => card.deckCardType !== 2)
      .map((card) => ({
        id: card.cardId,
        lvl: card.stars,
        uid: card.uid,
      }));
  };

  return (
    <header className="w-full h-[64px] bg-stone-900 border border-black">
      <div className="h-full flex items-center justify-between px-4">
        {!tutorial ? (
          <HandleBackButton
            onClick={onClick ? onClick : () => navigateTo("/island")}
          />
        ) : (
          <div></div>
        )}
        <PageName pageName={pageName} remainingPages={remainingPages} />

        {cards ? (
          <ItemCard
            img={undefined}
            name={t("deck")}
            onClick={() => {
              setIsDeckOpen(true);
              playSound("button");
            }}
          />
        ) : keys !== undefined ? (
          <KeysBalance keys={keys} />
        ) : (
          <CoinsBalance goldAmount={gold} />
        )}
      </div>

      {isDeckOpen && cards && (
        <CardsModal
          cardsAtDeck={transformCards(cards)}
          closeDeck={() => {
            setIsDeckOpen(false);
          }}
        />
      )}
    </header>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";

export const ClaimButton: React.FC = () => {
  const { t } = useTranslation();

  function onClickClaim() {
    alert("CLAIM CLICKED");
  }

  return (
    <button
      className="text-center bg-light-gray rounded-xl py-6 w-full"
      onClick={onClickClaim}
    >
      <p>{t("rewards.claim")}</p>
    </button>
  );
};

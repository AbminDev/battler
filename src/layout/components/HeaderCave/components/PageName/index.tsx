import React from "react";
import { useTranslation } from "react-i18next";

export let pageName: string;
export let remainingPages: number;

export const PageName: React.FC<{
  pageName: string;
  remainingPages?: number;
}> = ({ pageName, remainingPages }) => {
  const { t } = useTranslation();

  return (
    <div className="w-[120px] h-[66px] bg-[url('./assets/images/rectagleHeader.png')] bg-no-repeat bg-contain bg-center absolute top-0 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col pt-[8px] px-[18px]">
        <div
          className={`text-center text-amber-100 
            ${remainingPages && remainingPages > 0 ? "text-sm" : "text-base"} 
            leading-[14px] break-words`}
          style={{
            paddingTop: remainingPages && remainingPages > 0 ? "0" : "10px",
          }}
        >
          {pageName}
        </div>
        {remainingPages && remainingPages > 0 ? (
          <div className="text-center text-white text-xs leading-3 break-words">
            {t("dungeon.remainingPages")}: {remainingPages}
          </div>
        ) : null}
      </div>
    </div>
  );
};

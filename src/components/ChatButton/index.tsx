import { useTranslation } from "react-i18next";

export const ChatButton = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center bg-[#6B696A] rounded-lg border-2 p-1 border-black relative  w-10 h-10">
      <div className="bg-[#171B1A] rounded-[3px] border relative border-black flex flex-col items-center min-w-8 h-8">
        <div className="flex w-full h-full items-center justify-center">
          <img
            src={require("../../assets/images/chat.png")}
            className=" w-[22.86px] h-[22.86px] "
          />
        </div>
        <div className="absolute -top-0.5 text-center text-violet-100 text-[10px] font-light leading-[10px] mt-8">
          {t("chat")}
        </div>
      </div>
    </div>
  );
};

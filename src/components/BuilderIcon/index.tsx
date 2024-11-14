import { useTranslation } from "react-i18next";
import { useUtils } from "../../utils/navigateTo";
import {useSoundService} from "../../utils/soundService";

export const BuilderIcon = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();
  const { navigateTo } = useUtils();
  const { playSound } = useSoundService();

  return (
    <div
      className="relative w-16 h-16 flex justify-center items-center"
      onClick={() => {
        playSound('button');
        onClick();
      }}>
      <div className="border bottom-2 border-white rounded-full">
        <div className="border bottom-2 border-black rounded-full w-14 h-14">
          <img
            src={require("../../assets/images/builderIcon.png")}
            alt="Event Icon"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

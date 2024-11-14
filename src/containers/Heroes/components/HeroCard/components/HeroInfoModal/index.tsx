import { useTranslation } from "react-i18next";

export const HeroInfoModal = ({ skills, onClose }: any) => {
  const { t } = useTranslation();

  // Групування навичок за bonusType та сумування bonusAmount
  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    if (acc[skill.bonusType]) {
      acc[skill.bonusType] += skill.bonusAmount;
    } else {
      acc[skill.bonusType] = skill.bonusAmount;
    }
    return acc;
  }, {});

  // Перетворення об'єкта на масив для зручності відображення
  const aggregatedSkills = Object.entries(groupedSkills).map(
    ([bonusType, bonusAmount]) => ({
      bonusType,
      bonusAmount,
    })
  );

  return (
    <div className="fixed top-[25%] left-0 right-0 z-40 flex items-center justify-center">
      <div className="relative bg-[#250f12] border border-[#18191a] rounded-[2px] p-1 max-w-lg w-full mx-4">
        {/* Декоративні Зображення */}
        <img
          src={require("../../../../../../assets/images/cards-modal-border.png")}
          className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]"
          alt=""
        />
        <img
          src={require("../../../../../../assets/images/cards-modal-border.png")}
          className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90"
          alt=""
        />
        <img
          src={require("../../../../../../assets/images/cards-modal-border.png")}
          className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180"
          alt=""
        />

        <button
          onClick={onClose}
          className="absolute z-20 w-7 h-7 -top-1 -right-1 flex items-center justify-center transition"
        >
          <img
            src={require("../../../../../../assets/images/shop-modal-close.png")}
            className="w-full h-full"
            alt="Close"
          />
        </button>

        {/* Основний Вміст Модалки */}
        <div className="w-full bg-[#201B18] border border-[#5b382e] rounded-[2px] p-3 shadow-inner-sm-white">
          {/* Заголовок Модалки */}
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 flex justify-center">
            <div className="min-w-[120px] bg-[#847a70] border border-[#18191a] rounded-[2px] p-[1px]">
              <div className="bg-[#351d1e] text-center text-white text-xl p-2 leading-none rounded-[1px] border border-[#18191a] shadow-inner-sm-black">
                {t('heroes.heroInformation')}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 py-2">
            {aggregatedSkills.map((skill: any, index: number) => (
              <div
                key={skill.bonusType}
                className={`flex justify-between items-center px-4 py-2 ${
                  index % 2 === 1 ? "bg-[#362d28]" : "bg-transparent"
                }`}
              >
                <div className="text-white text-sm font-normal leading-[14px]">
                  {t(`bonusTypes.${skill.bonusType}`)}
                </div>
                <div className="text-right text-white text-sm font-black leading-[14px]">
                  {skill.bonusAmount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

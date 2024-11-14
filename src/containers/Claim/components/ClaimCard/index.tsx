import { useTranslation } from "react-i18next";

interface ClaimCardProps {
    textKeyTitle: string;
    value: number;
    imgName: string;
}

export const ClaimCard = (props: ClaimCardProps) => {
    const {textKeyTitle, value, imgName} = props;
    
    const { t } = useTranslation();

    return (
        <button
            className="w-full p-[10px] bg-[#21263F] rounded-md justify-center gap-2.5 flex flex-row items-center">
        <div className="flex flex-row items-center justify-between w-full pr-3">
            <div className="flex flex-row items-center">
                <div className="border-[rgba(69,81,117,1)] border rounded-[5px] flex py-[5px] bg-[#1A1E32] w-10 h-10">
                    <img src={require(`../../../../assets/images/${imgName}.png`)}/>
                </div>
                <div className="flex flex-col items-start pl-2">
                    <p className="text-[#ADB2CE]">{t(textKeyTitle)}</p>
                    <div className="flex flex-row gap-[1px]">
                        <div className="w-5 h-5">
                            <img src={require('../../../../assets/images/lobby_ico.png')}/>
                        </div>
                        <p className="text-white">+{value}</p>
                    </div>
                </div>
            </div>
            <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex items-center"
            >
            <path
                d="M5.95463 1.84049C5.74373 2.05146 5.62525 2.33756 5.62525 2.63587C5.62525 2.93418 5.74373 3.22027 5.95463 3.43124L11.5234 8.99999L5.95463 14.5687C5.7497 14.7809 5.63631 15.0651 5.63887 15.3601C5.64144 15.655 5.75975 15.9372 5.96834 16.1458C6.17692 16.3544 6.45908 16.4727 6.75406 16.4753C7.04903 16.4778 7.3332 16.3644 7.54538 16.1595L13.9095 9.79537C14.1204 9.5844 14.2389 9.2983 14.2389 8.99999C14.2389 8.70168 14.1204 8.41559 13.9095 8.20462L7.54538 1.84049C7.33441 1.62959 7.04832 1.51111 6.75001 1.51111C6.4517 1.51111 6.1656 1.62959 5.95463 1.84049Z"
                fill="white"
            />
            </svg>
        </div>
        </button>
    );
};

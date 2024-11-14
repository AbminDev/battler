import { useTranslation } from "react-i18next";

interface NavButtonProps {
    handleClickSvg: () => void;
    activeDiv: string;
    textKey: string;
    type: 'heroes' | 'home' | 'friends' | 'rewards' | 'profile';
}

export const NavButton = (props: NavButtonProps) => {
    const {handleClickSvg, activeDiv, textKey, type} = props;
    const { t } = useTranslation();

    return (
        <div
        className="flex flex-col items-center justify-center select-none w-full"
        onClick={() => {handleClickSvg();}}
        >
            <div className={activeDiv === (type === 'home' ? '/' : ("/"+type)) ? "bg-[rgba(255,255,255,0.10)] rounded-[12px] flex flex-col items-center justify-center w-full py-2" : "py-2 rounded-[12px] w-full flex-1 flex flex-col items-center justify-center"}>
                <Ico
                    type={type}
                    activeDiv={activeDiv}/>
                <p
                style={activeDiv === (type === 'home' ? '/' : ("/"+type))
                    ? {fontWeight: 800, color: "#FFF"}
                    : {fontWeight: 500, color: "rgba(173,178,206,1)"}}
                className={`text-xxs font-medium font-size text-xs pt-1 text-[rgba(173,178,206,1)]`}>
                {t(textKey)}
                </p>
            </div>
      </div>
    );
};

const Ico = (props: {type: 'heroes' | 'home' | 'friends' | 'rewards' | 'profile', activeDiv: string}) => {
    
    return (
        <div className="flex object-contain w-[32px] h-[32px] items-center justify-center">
            <img src={require(`../../../../assets/images/${props.type}_ico.png`)}/>
        </div>
    )
};

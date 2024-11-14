interface LargeButtonProps {
    width?: number;
    height?: number;
    onClick?: () => void;
    title?: string;
}

export const LargeButton = (props: LargeButtonProps) => {
    const { width = 180, height = 72, onClick, title } = props;
    
    return (
        <button onClick={onClick} style={{width: width, height: height}} className={`rounded-xl pb-[3px] p-[1px] bg-[linear-gradient(rgba(240,158,0,1)0%,rgba(209,71,0,1)94.4%,rgba(161,52,18,1)100%)] shadow-[0_4px_5px_0_rgba(0, 0, 0, 0.30)]`}>
            <div style={{width: width-2, height: height-4}} className={`p-[3px] rounded-[11px] bg-border-button-gradient`}>
                <div style={{width: width-8, height: height-10}} className={`bg-[linear-gradient(rgba(248,215,116,1)0%,rgba(255,180,0,1)100%)] rounded-[10px] justify-center items-center flex shadow-[0_0_3px_0_#976200_inset]`}>
                    <p className="z-10 text-[32px] text-white drop-shadow-[2px_2px_0px_#18191A] font-black">{title}</p>
                </div>
            </div>
        </button>
    );
};
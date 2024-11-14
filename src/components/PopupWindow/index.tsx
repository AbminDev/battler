import { PropsWithChildren } from "react";

interface PopupProps {
    children?: string | JSX.Element | JSX.Element[];
    headerElement?: string | JSX.Element | JSX.Element[];
    onClickClose: () => void;
}


export const PopupWindow = (props: PopupProps) => {
    const {children, onClickClose, headerElement} = props;

    return (
            <div className="absolute z-[52] inset-x-4 bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
                    <img
                    src={require("../../assets/images/cards-modal-border.png")}
                    className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]"
                    alt=""
                    />
                    <img
                    src={require("../../assets/images/cards-modal-border.png")}
                    className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90"
                    alt=""
                    />
                    <img
                    src={require("../../assets/images/cards-modal-border.png")}
                    className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180"
                    alt=""
                    />
                    <button
                    onClick={onClickClose}
                    className="absolute z-20 w-7 h-7 -top-1 -right-1 flex items-center justify-center transition"
                    >
                    <img
                        src={require("../../assets/images/shop-modal-close.png")}
                        className="w-full h-full"
                        alt="Закрити"
                        />
                    </button>
                    <div className="w-full  bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
                        {headerElement}
                        <div className="relative flex w-full flex-col bg-[#201b18] rounded-[1px] shadow-inner-sm-black items-center justify-center">
                            {children}
                        </div>
                    </div>
            </div>
    )
}
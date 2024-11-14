
interface BuildButtonProps {
    active?: boolean;
    onClick?: () => void;
}

export const BuildButton = (props: BuildButtonProps) => {
    const { active = false, onClick } = props;

    return (
        <button onClick={onClick} className="z-[100] fixed top-24 right-5 w-12 h-12 bg-[#6B696A] border border-black rounded-[2px] flex items-center justify-center">
            <div className="w-10 h-10 rounded-[2px] border-[0.5px] border-black bg-[radial-gradient(46.53%_46.53%_at_50%_50%,rgba(255,255,255,0.1)0%,rgba(255,255,255,0.0)100%)] [background-blend-mode:lighter_normal] [box-shadow:0px_0px_1.4px_0.7px_rgba(0,0,0,0.21)] bg-[#171B1A] flex items-center justify-center">
                { active
                ? (
                    <CloseIco/>
                )
                : (
                    <img src={require('../../../assets/images/farmIcons/buildIco.png')}/>
                )}
            </div>
        </button>
    );
};

const CloseIco = () => {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_932_9754)">
                <path d="M22 4.3257L19.6743 2L12 9.67431L4.3257 2L2 4.3257L9.67431 12L2 19.6743L4.3257 22L12 14.3257L19.6743 22L22 19.6743L14.3257 12L22 4.3257Z" fill="white"/>
                <path d="M22.3536 4.67925L22.7071 4.3257L22.3536 3.97214L20.0279 1.64645L19.6743 1.29289L19.3208 1.64645L12 8.9672L4.67925 1.64645L4.3257 1.29289L3.97214 1.64645L1.64645 3.97214L1.29289 4.3257L1.64645 4.67925L8.9672 12L1.64645 19.3208L1.29289 19.6743L1.64645 20.0279L3.97214 22.3536L4.3257 22.7071L4.67925 22.3536L12 15.0328L19.3208 22.3536L19.6743 22.7071L20.0279 22.3536L22.3536 20.0279L22.7071 19.6743L22.3536 19.3208L15.0328 12L22.3536 4.67925Z" stroke="#3B3B3B"/>
            </g>
            <defs>
                <filter id="filter0_d_932_9754" x="0.585938" y="0.585785" width="22.8281" height="23.8284" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_932_9754"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_932_9754" result="shape"/>
                </filter>
            </defs>
        </svg>

    )
}

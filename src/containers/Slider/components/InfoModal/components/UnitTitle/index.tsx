
interface UnitTitleProps {
    nickname: string;
}

export const UnitTitle = (props: UnitTitleProps) => {
    const { nickname } = props;

    return (
        <div className="bg-dark-gray flex-1 rounded-lg flex flex-row mt-2 py-3">
            <div className="p-2">
                <img src={require('../../../../../../assets/images/placeholder.png')}/>
            </div>
            <div className="w-full pr-2">
                <p className="text-white">{nickname}</p>
                <div className="flex-1 h-3 bg-progress-bar rounded-2xl text-center">
                    <div className="absolute z-0 h-3 w-1/4 bg-progress-bar-active rounded-2xl"/>
                    <p className="text-xs leading-3 z-30">lvl 7</p>
                </div>
            </div>
        </div>
    );
};
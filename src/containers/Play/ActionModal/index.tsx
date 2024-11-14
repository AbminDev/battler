import { CardsAction } from "../../../enums/cardsActions";
import {DungeonType, StageType} from "../../../endpoints/mock";

interface ActionModal {
    type: StageType;
    onClose: () => void;
}

export const ActionModal = (props: ActionModal) => {
    const {type, onClose} = props;

    return(
        <div className="absolute w-full h-full px-8 bg-[rgba(1,1,1,0.7)] top-0 left-0 justify-center pt-40 z-40">
            <div className="bg-dark-gray p-16 m-auto text-center">
                <p>{type}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};


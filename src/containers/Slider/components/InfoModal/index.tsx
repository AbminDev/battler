import { useState } from "react";
import { cards, characteristics } from "./mock";
import { ModalTitle, UnitCard, UnitTitle } from "./components";

interface InfoModalProps {
    onClickClose: () => void;
}

export const InfoModal = (props: InfoModalProps) => {
    const [index, setIndex] = useState(1);
    const {onClickClose} = props;

    return (
        <div className="absolute w-full h-full bg-dark top-0 left-0 z-10 bg-opacity-90 px-9 content-center">
            <div className="bg-white rounded-2xl overflow-hidden">
                <ModalTitle
                    title="TITLE"
                    onClickClose={onClickClose}/>
                <div className="px-2">
                    <UnitTitle
                        nickname="Unit Title"/>
                    <UnitCard
                        characteristics={characteristics[index - 1].chars}/>
                    <div className="flex flex-row w-full flex-wrap pb-4 overflow-scroll h-56">
                        {cards.map((card) => 
                            <button key={card.id} className="w-1/4 aspect-square p-1" onClick={() => setIndex(card.id)}>
                                <div className={`bg-white w-full h-full border-2 rounded-lg border-${index === card.id ? 'progress-bar-active' : 'dark-outer'} flex`}>
                                    <img src={card.img}/>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


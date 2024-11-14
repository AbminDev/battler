import {MutableRefObject, useEffect} from "react";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { useDispatch } from "react-redux";
import { useIsland } from "./useIsland";
import { IslandConfig } from "../../../interfaces/farm";
import {setBattleSave} from "../../../app/features/battleSaveSlice";
import {getBattleProgress} from "../../../endpoints/battleProgress";
import {useTelegram} from "../../../hooks/useTelegram";
import {store} from "../../../app/store";
import {setSave} from "../../../app/features/tutorialSaveSlice";

export interface IslandProps {
    island: IslandConfig;
    zoomRef?: MutableRefObject<ReactZoomPanPinchRef | null>;
}

export const Island = (props: IslandProps) => {
    const { userId } = useTelegram();
    const dispatch = useDispatch();

    // utils, functions
    const {
        islands,
        island,
        transition,
        onClickNavigate,
    } = useIsland(props);

    useEffect(() => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@');
        if (!store.getState().battleSave.battleSave.save) {
            console.log('CLientId->', userId);
            (async () => {
                const battleSave = await getBattleProgress({clientId: userId ? userId : 'testClientId'});
                dispatch(setBattleSave(battleSave));
            })();
            // dispatch(setSave({completed: true}))
        }
    }, []);

    // render islands on Farm
    const RenderIsland = () => {
        if (islands.find(islnd => islnd.id === island.id)) {
            return (
                <button className="w-full h-full flex items-center justify-center" onClick={onClickNavigate}>
                    <img src={require(`../../../assets/images/island${island.id}.png`)}/>
                </button>
            )
        } else {
            return (
                <div className="flex items-center justify-center">
                    <img className="absolute z-20"
                        src={require('../../../assets/images/cloudInactive.png')}
                        style={island.id % 2 === 0 ? {transform: "scale(-1,-1)"} : {}}/>
                    <button className="w-full h-full flex items-center justify-center cursor-auto brightness-[30%] py-1">
                        <img src={require(`../../../assets/images/island${island.id}.png`)}/>
                    </button>
                </div>
            )
        }
    }

    return (
        <div id={'room_'+island.id} className={''}>
            {transition && <Transition/>}
            <RenderIsland/>
        </div>
    );
};

// transition while zoom
const Transition = () => {
    return (
        <div className="min-w-full min-h-full bg-black absolute left-0 top-0 z-[100] animate-transition"/>
    )
}

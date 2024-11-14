import { useSessionStorage } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBuilding } from "../../../../../app/features/buildingSlice";
import { GoldIco } from "../../../../../layout/components/HeaderFarm/components/ResourceCard";
import { setSelectedRoom } from "../../../../../app/features/selectedRoom";
import { setIslandRoomBuilding, setIslands } from "../../../../../app/features/islandsSlice";
import { RootState } from "../../../../../app/store";
import { setResource, setResources } from "../../../../../app/features/resourcesSlice";
import { BuildingConfig } from "../../../../../interfaces/farm";
import { Resources } from "../../../../../enums/resources";
import { useTranslation } from "react-i18next";
import { RoomTypes } from "../../../../../enums/roomType";


interface BuildCardProps {
    building: BuildingConfig;
}

export const BuildCard = (props: BuildCardProps) => {
    const { building } = props;
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const islands = useSelector(
        (state: RootState) => state.islands.islands
    )

    const selectedRoom = useSelector(
        (state: RootState) => state.selectedRoom
    )

    const selectedIsland = useSelector(
        (state: RootState) => state.selectedIsland.selectedIsland
    )

    const resources = useSelector(
        (state: RootState) => state.resources.resources
    )

    const selectedRoomLvlConfig = building.lvlInfo.find(lvl => lvl.lvl === 1);

    const onClick = () => {
        const currentValue = resources.find(v => v.resourceType === Resources.kitsu)!.value;
        const createCost = selectedRoomLvlConfig!.createCost;

        if (currentValue >= createCost) {
            dispatch(setIslandRoomBuilding({islandId: selectedIsland!.id, roomId: selectedRoom.id, buildingId: building.id}))
            dispatch(setSelectedRoom({id: -1}));
            dispatch(setResource({resource: Resources.kitsu, newValue: currentValue - createCost}))
        } else {
            window.alert("Not enough gold!")
        }
    }

    return (
        <button className="min-w-[90px] max-w-[90px] z-20" onClick={onClick}>
            <div className="text-white text-center p-1 min-h-full h-full max-h-full items-center justify-start border border-[#19191B] flex flex-col rounded-[3px] bg-[#534533]">
                <div className="flex w-full h-[50px] z-0 border-[2px] border-[#372d22]">
                    <img className="w-full h-full object-cover" src={building ? require(`../../../../../assets/images/build${building.id}.png`) : require('../../../../../assets/images/placeholder.png')}/>
                </div>
                <div className="w-full flex justify-between flex-1 items-center flex-col">
                    <div className="z-10 pt-1 gap-1 flex flex-col">
                        <p className="text-[14px] text-stroke-small leading-[14px]">{t(building.title || "")}</p>
                        <p className="text-[8px] px-[6px] leading-[12px] text-center text-[#DFD9C4]">{t(building.description || "")}</p>
                    </div>
                    <div className="flex flex-row justify-center mb-1 rounded-[2px] bg-[#493C2D] w-[90%] items-center gap-1">
                        <div className="w-[15px] h-[15px]">
                            <GoldIco/>
                        </div>
                        <p className="font-[300] text-[14px] text-stroke-small">{selectedRoomLvlConfig!.createCost}</p>
                    </div>
                </div>
            </div>
        </button>

    );
};
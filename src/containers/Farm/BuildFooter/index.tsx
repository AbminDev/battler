import { BuildCard } from "./components";
import { RoomTypes } from "../../../enums/roomType";
import { defineAvailableBuildings } from "./utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface BuildFooterProps {
    type: RoomTypes;
}

export const BuildFooter = (props: BuildFooterProps) => {
    const { type } = props;
    const {islands, buildingConfigs } = useSelector((state: RootState) => state.config);
    const cards = defineAvailableBuildings(type, buildingConfigs!, islands!);

    console.log(cards);
    // const cards1 = availableBuldings;

    return (
        <footer className="fixed z-50 h-[160px] bottom-0 bg-[radial-gradient(50%_50%_at_50%_50%,#332B26_0%,#201B18_100%)] w-full left-0 flex flex-col animate-smoothAppear">
            <div className="w-full h-[4px] bg-[linear-gradient(0deg,#372C25_0%,#534038_100%)] border border-x-0 border-[#0E0100] [box-shadow:0px_2px_0px_0px_rgba(0,0,0,0.3),0px_-2px_0px_0px_rgba(0,0,0,0.18)_inset] overflow-hidden z-10"/>
            <div className="flex flex-row gap-2 w-full flex-grow p-2 overflow-x-scroll overflow-y-hidden">
                {
                cards.map(building => {
                    if (building) {
                        return (
                            <BuildCard building={building} key={building.id} />
                        )
                    }
                })}
            </div>
        </footer>
    );
};
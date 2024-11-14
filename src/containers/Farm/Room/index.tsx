import { useSelector } from "react-redux";
import { RootState, store } from "../../../app/store";
import { RoomStatus } from "../../../enums/buildingStatus";
import { FooterSelectHero } from "../../../layout/components/FooterSelectHero";
import { RenderRoom } from "./components/RenderRoom";
import { RoomProps } from "./interface";
import { useRoom } from "./useRoom";
import { useEffect, useState } from "react";
import { FooterRestartBattle } from "../../../layout/components/FooterRestartBattle";

export const Room = (props: RoomProps) => {
  const { scheme, room } = props;

  const {
    startSelectHero,
    onClick,
    Claim,
    building,
    timer,
    isBattle,
    roomDisplay,
    triggerEndBuild,
    triggerShowLevelUp,
    boosts,
    buildTime,
    openSpeed,
    isConfirmationRequired,
    confirmBuildingCompletion,
    heroesListRef,
    heroesListScroll,
    selectedHeroUid,
    setSelectedHeroUid,
    onClickBattle,
    getDungeonSave,
    isDungeonStart,
  } = useRoom(props);

  const selectedRoom = useSelector((state: RootState) => state.selectedRoom);

  // console.log("room" , room)

  return (
    <>
      <button
        id={"room_" + room?.id}
        onClick={onClick}
        className="overflow-visible w-full h-full flex items-center justify-center"
        style={{
          position: "absolute",
          top: roomDisplay.y,
          left: roomDisplay.x,
          width: roomDisplay.width,
          maxHeight: roomDisplay.height,
          height: roomDisplay.height,
        }}
      >
        <RenderRoom
          id={scheme.id}
          status={isBattle()}
          isClaim={Claim}
          building={building}
          triggerEndBuild={triggerEndBuild}
          triggerShowLevelUp={triggerShowLevelUp}
          roomLvl={room?.lvl}
          title={building?.title}
          boosts={boosts}
          buildTime={buildTime}
          isConfirmationRequired={isConfirmationRequired}
          confirmBuildingCompletion={confirmBuildingCompletion}
        />
      </button>
      {(startSelectHero || isDungeonStart) && selectedRoom.id === room?.id && (
        <FooterSelectHero
          id={"room_" + room?.id}
          onClickBattle={onClickBattle}
        />
      )}
      {/* {isDungeonStart && selectedRoom.id === room?.id && (
        <FooterRestartBattle
          id={"room_" + room?.id}
          onClickRestartBattle={onClickBattle}
        />
      )} */}
    </>
  );
};

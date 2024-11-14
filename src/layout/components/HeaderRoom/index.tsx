export const HeaderRoom = () => {
    return (<div/>)
}

// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../app/store";
// import { availableBuldings } from "../../../mock/buildings";
// import { useNavigate } from "react-router-dom";
// import { setSelectedRoom } from "../../../app/features/selectedRoom";
// import { useUtils } from "../../../utils/navigateTo";


// interface HeaderRoomProps {

// };

// export const HeaderRoom = (props: HeaderRoomProps) => {
//     const { } = props;
//     const {navigateTo} = useUtils();

//     const currentRoomId = useSelector(
//         (state: RootState) => state.selectedRoom.selectedRoomId
//     );

//     const usersBuildings = useSelector(
//         (state: RootState) => state.buildings.buildings
//     );
    
//     const selectedUserRoom = usersBuildings.filter(building => building.id === currentRoomId)[0];
//     const selectedRoom = availableBuldings.filter(bldn => bldn.id === selectedUserRoom.buildingId)?.[0];

//     return (
//         <header className="fixed pt-[10px] flex flex-col px-[18px] z-50 top-0 left-0 justify-center items-center w-full gap-[12px]
//         bg-gradient-to-b from-[#000000cd] from-[0%] via-[50%] via-[#0000008d] to-[#00000000] to-[100%]">
//             <div className="text-center flex flex-row justify-center  w-full items-center">
//                 <button onClick={() => navigateTo('/')} className="absolute left-4">
//                     <img src={require('../../../assets/images/home_ico.png')}/>
//                 </button>
//                 <div className="text-center">
//                     <p className="text-white text-stroke-small uppercase text-[18px] leading-4">{selectedRoom?.title}</p>
//                     <p className="text-white text-stroke-small uppercase text-[12px]">Lvl. {selectedUserRoom?.level}</p>
//                 </div>
//             </div>
//         </header>
//     );
// };
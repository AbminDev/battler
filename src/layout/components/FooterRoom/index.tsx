export const FooterRoom = () => {
    return (<div/>);
}

// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../app/store";
// import { removeBuilding } from "../../../endpoints/farmUsersBuildings";
// import { useTelegram } from "../../../hooks/useTelegram";
// import { useUtils } from "../../../utils/navigateTo";


// interface FooterRoomProps {

// };

// export const FooterRoom = (props: FooterRoomProps) => {
//     const { } = props;

//     const { user } = useTelegram();
//     const {navigateTo} = useUtils();

//     const currentRoomId = useSelector(
//         (state: RootState) => state.selectedRoom.selectedRoomId
//     );

//     const usersBuildings = useSelector(
//         (state: RootState) => state.buildings.buildings
//     );

//     const selectedRoomId = usersBuildings.filter(building => building.id === currentRoomId)[0]?.id;

//     const onClickDestroy = async () => {
//         navigateTo('/');
//         if (user) {
//             await removeBuilding({id: selectedRoomId, clientId: String(user.id)})
//         } else {
//             await removeBuilding({id: selectedRoomId, clientId: "123"})
//         }
//     }

//     return (
//         <header className="fixed pt-[10px] flex flex-col px-[18px] z-50 bottom-0 left-0 justify-center items-center w-full gap-[12px]
//         bg-gradient-to-t from-[#000000cd] from-[0%] via-[50%] via-[#0000008d] to-[#00000000] to-[100%]">
//             <div className="text-center flex flex-row justify-center  w-full items-center">
//                 <div className="text-center flex flex-row justify-between w-full">
//                     <button>
//                         <p className="text-green-500 text-stroke-small uppercase text-[18px]">UPGRADE</p>
//                     </button>
//                     <button onClick={onClickDestroy}>
//                         <p className="text-red-500 text-stroke-small uppercase text-[18px]">DESTROY</p>
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// };
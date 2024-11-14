import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomTypes } from "../../enums/roomType";

interface SelectedRoomState {
  id: number;
  type?: RoomTypes;
  buildingId?: number;
  lvl?: number;
  statusUpdateDate?: Date;
}
const initialState: SelectedRoomState = {
  id: -1,
  type: undefined,
  buildingId: undefined,
  lvl: undefined,
  statusUpdateDate: undefined,
};

const selectedRoomSlice = createSlice({
  name: "selectedRoom",
  initialState,
  reducers: {
    setSelectedRoom: (
      state,
      action: PayloadAction<{
        id: number;
        type?: RoomTypes;
        buildingId?: number;
        lvl?: number;
        statusUpdateDate?: Date;
      }>
    ) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
      state.buildingId = action.payload.buildingId;
      state.lvl = action.payload.lvl;
      state.statusUpdateDate = action.payload.statusUpdateDate;
    },
  },
});
export const { setSelectedRoom } = selectedRoomSlice.actions;
export default selectedRoomSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Island } from "../../interfaces/farm";
import { farmRoomMock } from "../../mock/buildings";
import { RoomStatus } from "../../enums/buildingStatus";
import { getIslands } from "../../endpoints/farmMock";

interface IslandsState {
  islands: Island[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
const initialState: IslandsState = {
  islands: [],
  status: 'idle',
  error: null,
};


export const fetchIslands = createAsyncThunk(
  'islands/fetchIslands',
  async (clientId: string) => {
    const response = await getIslands({ clientId });
    return response;
  }
);

const islandsSlice = createSlice({
  name: "islands",
  initialState,
  reducers: {
    setIslands(state, action) {
      return {
        ...state,
        islands: action.payload,
      };
    },
    addIslandRoom(
      state,
      action: PayloadAction<{
        islandId: number;
        roomId: number;
        status: RoomStatus;
        buildingId?: number;
      }>
    ) {
      const { islandId, roomId, status, buildingId } = action.payload;
      let newIslandsMod = state.islands.map((v) => {
        if (v.id === islandId) {
          return {
            ...v,
            buildings: v.buildings.concat([
              {
                id: roomId,
                status: status,
                buildingId: buildingId,
                lvl: buildingId ? 1 : undefined,
                statusUpdateDate: new Date(Date.now()),
                instabuild: false,
              },
            ]),
          };
        }
        return v;
      });
      return {
        ...state,
        islands: newIslandsMod,
      };
    },
    setIslandRoomBuilding(
      state,
      action: PayloadAction<{
        islandId: number;
        roomId: number;
        buildingId: number;
        startBuilding?: Date;
      }>
    ) {
      const newIslands = state.islands.map((v) => {
        if (v.id === action.payload.islandId) {
          const newRooms = v.buildings.map((room) => {
            if (room.id === action.payload.roomId) {
              return {
                ...room,
                lvl: 1,
                buildingId: action.payload.buildingId,
                status: RoomStatus.building,
                statusUpdateDate: action.payload.startBuilding
                  ? action.payload.startBuilding
                  : new Date(Date.now()),
              };
            }
            return room;
          });
          return { ...v, buildings: newRooms };
        }
        return v;
      });
      return {
        ...state,
        islands: newIslands,
      };
    },
    setIslandRoomStatus(
      state,
      action: PayloadAction<{
        islandId: number;
        roomId: number;
        status: RoomStatus;
        instabuild?: boolean;
      }>
    ) {
      const newIslands = state.islands.map((v) => {
        if (v.id === action.payload.islandId) {
          const newRooms = v.buildings.map((room) => {
            if (room.id === action.payload.roomId) {
              return {
                ...room,
                status: action.payload.status,
                statusUpdateDate: new Date(Date.now()),
                instabuild: action.payload.instabuild ?? false,
              };
            }
            return room;
          });
          return { ...v, buildings: newRooms };
        }
        return v;
      });
      return {
        ...state,
        islands: newIslands,
      };
    },
    upgradeIslandRoom(
      state,
      action: PayloadAction<{
        islandId: number;
        roomId: number;
        lvl: number;
        startBuilding?: Date;
        instabuild?: boolean;
      }>
    ) {
      const newIslands = state.islands.map((v) => {
        if (v.id === action.payload.islandId) {
          const newRooms = v.buildings.map((room) => {
            if (room.id === action.payload.roomId) {
              return {
                ...room,
                lvl: action.payload.lvl,
                status: RoomStatus.building,
                statusUpdateDate: action.payload.startBuilding
                  ? action.payload.startBuilding
                  : new Date(Date.now()),
                  instabuild: action.payload.instabuild ?? false,
              };
            }
            return room;
          });
          return { ...v, buildings: newRooms };
        }
        return v;
      });
      return {
        ...state,
        islands: newIslands,
      };
    },

    repairIslandRoom(
      state,
      action: PayloadAction<{ islandId: number; roomId: number }>
    ) {
      const newIslands = state.islands.map((v) => {
        if (v.id === action.payload.islandId) {
          const newRooms = v.buildings.map((room) => {
            if (room.id === action.payload.roomId) {
              return {
                ...room,
                status: RoomStatus.repairing,
                statusUpdateDate: new Date(Date.now()),
              };
            }
            return room;
          });
          return { ...v, buildings: newRooms };
        }
        return v;
      });
      return {
        ...state,
        islands: newIslands,
      };
    },
    addFarmIsland(state, action: PayloadAction<{ islandId?: number }>) {
      const newIslands = state.islands.concat([
        action?.payload.islandId
          ? { id: action.payload.islandId, buildings: [] }
          : { id: state.islands[state.islands.length - 1].id + 1, buildings: [] },
      ]);
      return {
        ...state,
        islands: newIslands,
      };
    },
    claimIslandRoom(
      state,
      action: PayloadAction<{
        islandId: number;
        roomId: number;
        lastGathered?: Date;
      }>
    ) {
      const newIslands = state.islands.map((v) => {
        if (v.id === action.payload.islandId) {
          const newRooms = v.buildings.map((room) => {
            if (room.id === action.payload.roomId) {
              return {
                ...room,
                statusUpdateDate: action.payload.lastGathered
                  ? action.payload.lastGathered
                  : new Date(Date.now()),
              };
            }
            return room;
          });
          return { ...v, buildings: newRooms };
        }
        return v;
      });
      return {
        ...state,
        islands: newIslands,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIslands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIslands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.islands = action.payload;
      })
      .addCase(fetchIslands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const {
  setIslands,
  repairIslandRoom,
  setIslandRoomStatus,
  setIslandRoomBuilding,
  upgradeIslandRoom,
  addFarmIsland,
  claimIslandRoom,
  addIslandRoom,
} = islandsSlice.actions;
export default islandsSlice.reducer;

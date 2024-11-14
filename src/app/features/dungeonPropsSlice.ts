import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {BattleSaves, DungeonType} from "../../endpoints/mock";

interface DungeonProps {
  dungeon: DungeonType,
  currentSave: BattleSaves,
}

interface DungeonPropsState {
  dungeonProps: {
    props: DungeonProps | null
  };
}

const initialState: DungeonPropsState = {
  dungeonProps: {props: null},
};

const dungeonPropsSlice = createSlice({
  name: "dungeonProps",
  initialState,
  reducers: {
    setDungeonProps(state, action: PayloadAction<DungeonProps>) {
      state.dungeonProps.props = action.payload;
    },
    clearDungeonProps(state) {
      state.dungeonProps.props = null;
    },
  },
});

export const { setDungeonProps, clearDungeonProps } = dungeonPropsSlice.actions;

export default dungeonPropsSlice.reducer;

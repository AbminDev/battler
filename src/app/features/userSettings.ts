import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { settings: {
    vibration: true,
    sound: true,
    music: true,
    language: 'en',
    exchange: null
  }
};

const userSettings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUserSettings(state, action: PayloadAction<any>) {
      state.settings = action.payload;
    },
  },
});

export const { setUserSettings } = userSettings.actions;

export default userSettings.reducer;

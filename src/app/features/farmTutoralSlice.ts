import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TutorialFarmSave } from "../../interfaces/tutorial";
import {
  getFarmTutorialProgress,
  updateFarmTutorialProgress,
} from "../../endpoints/tutorialProgress";

interface TutorialFarmSaveState {
  tutorialFarmSave: {
    save: TutorialFarmSave | null;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TutorialFarmSaveState = {
  tutorialFarmSave: { save: null },
  status: "idle",
  error: null,
};

export const fetchFarmTutorialProgress = createAsyncThunk(
  "farmTutorial/fetchProgress",
  async (clientId: string) => {
    const response = await getFarmTutorialProgress({ clientId });


    return response;
  }
);

export const saveFarmTutorialProgress = createAsyncThunk(
  "farmTutorial/saveProgress",
  async ({ clientId, save }: { clientId: string; save: TutorialFarmSave }) => {
    await updateFarmTutorialProgress({
      clientId,
      save: JSON.stringify(save),
    });
    return save;
  }
);

const farmTutorialSlice = createSlice({
  name: "farmTutorial",
  initialState,
  reducers: {
    setFarmSave(state, action) {
      state.tutorialFarmSave.save = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmTutorialProgress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFarmTutorialProgress.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.tutorialFarmSave.save = action.payload;
      })
      .addCase(fetchFarmTutorialProgress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch progress";
      })
      .addCase(saveFarmTutorialProgress.fulfilled, (state, action) => {
        state.tutorialFarmSave.save = action.payload;
      });
  },
});

export const { setFarmSave } = farmTutorialSlice.actions;
export default farmTutorialSlice.reducer;

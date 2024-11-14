// inventorySlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Adjust the import path as needed
import {
  getActiveBoosts,
  usingBoosts,
} from "../../endpoints/Inventory/getInventoryInfo";

export enum BoostsType {
  speedUp,
}

export interface Boost {
  bonusId: number;
  bonusType: BoostsType;
  duration: number;
  amount: number;
}

export interface ConfigBoost {
  id: { value: number};
  bonusType: { value: BoostsType};
  nominal: {value: number};
}


interface InventoryState {
  boosts: Boost[];
}

const initialState: InventoryState = {
  boosts: [],
};

// Async thunk to fetch active boosts
export const fetchActiveBoosts = createAsyncThunk<
  Boost[],
  string,
  { state: RootState }
>("inventory/fetchActiveBoosts", async (clientId, thunkAPI) => {
  // Call the backend endpoint
  const response = await getActiveBoosts({
    clientId,
  });

  const state = thunkAPI.getState();
  const boostsConfig = state.appConfig.configs.boosts.variables;

  const boostsWithDuration: Boost[] = response.boosts.map((boost: any) => {
    const matchedConfig = boostsConfig.find(
      (boostConfig: any) => boost.bonusId === boostConfig.id.value
    );
    const duration = matchedConfig ? matchedConfig.nominal.value : 0;

    return { ...boost, duration };
  });

  return boostsWithDuration;
});

export const usedBoosts = createAsyncThunk<
  void,
  {
    clientId: string;
    buildingId: number;
    bonusType: BoostsType;
    bonusId: number;
    islandId: number;
  },
  { state: RootState }
>(
  "inventory/useBoosts",
  async ({ clientId, buildingId, bonusType, bonusId, islandId }, thunkAPI) => {
    const response = await usingBoosts({
      clientId,
      buildingId,
      bonusType,
      bonusId,
      islandId,
    });
    return response;

    // Optionally, you can dispatch other actions or return data if needed
  }
);

// The inventory slice
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    // You can keep or modify existing reducers
    addBoost(state, action: PayloadAction<Boost>) {
      state.boosts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActiveBoosts.fulfilled, (state, action) => {
      // Update boosts with the fetched data
      state.boosts = action.payload;
    });
    // Handle other async thunks if needed
  },
});

export const { addBoost } = inventorySlice.actions;
export default inventorySlice.reducer;

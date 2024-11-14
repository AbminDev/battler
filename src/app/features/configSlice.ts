// slices/configSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BuildingConfig, Island } from '../../interfaces/farm';
import { getFarmConfig } from '../../endpoints/configEndpoint';

interface ConfigState {
  islands: Island[] | null;
  buildingConfigs: BuildingConfig[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConfigState = {
  islands: null,
  buildingConfigs: null,
  loading: false,
  error: null,
};

// Async thunk to fetch config data
export const fetchConfig = createAsyncThunk(
  'config/fetchConfig',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFarmConfig();
      if (typeof data === 'string') {
        // It's an error message
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (err) {
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfig.fulfilled, (state, action: PayloadAction<{ islands: Island[]; buildingConfigs: BuildingConfig[] }>) => {
        state.loading = false;
        state.islands = action.payload.islands;
        state.buildingConfigs = action.payload.buildingConfigs;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default configSlice.reducer;
